import supertest from "supertest";
import databaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";
import auth from "../../src/utils/auth";

process.env.APP_SECRET = "test_secret";

interface AuthRequest {
  user?: { id: number; email: string; role: string };
}

// Mock verifyToken avant import de app
jest
  .spyOn(auth, "verifyToken")
  .mockImplementation((req, res, next): Response | undefined => {
    // Injecte un utilisateur fictif pour les tests
    (req as AuthRequest).user = { id: 1, email: "mock@mail.com", role: "user" };
    next();
    return undefined;
  });

// Puis on importe app
import app from "../../src/app";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GET /api/draws", () => {
  it("should fetch draws successfully", async () => {
    const rows = [] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/draws");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

describe("GET /api/draws/:id", () => {
  it("should fetch a single draw successfully", async () => {
    const rows = [{ id: 1, name: "Test Draw", image: "test.png" }] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/draws/1");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    const rows = [] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/draws/0");

    expect(response.status).toBe(404);
  });
});

describe("POST /api/draws", () => {
  it("should add a new draw successfully", async () => {
    const result = { insertId: 1 } as Result;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([result, []]);

    const fakeDraw = { name: "Sunset", image: "sunset.png" };
    const response = await supertest(app).post("/api/draws").send(fakeDraw);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    const result = { insertId: 1 } as Result;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([result, []]);

    const fakeDraw = { name: "" }; // image manquante
    const response = await supertest(app).post("/api/draws").send(fakeDraw);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});

describe("PUT /api/draws/:id", () => {
  it("should update an existing draw successfully", async () => {
    // Mock pour readById (1ère requête)
    jest
      .spyOn(databaseClient, "query")
      // 1er appel -> readById
      .mockResolvedValueOnce([
        [{ id: 1, name: "Old", image: "old.png" }] as Rows,
        [],
      ])
      // 2e appel -> update
      .mockResolvedValueOnce([{ affectedRows: 1 } as Result, []]);

    const fakeDraw = { name: "Updated", image: "updated.png" };
    const response = await supertest(app).put("/api/draws/1").send(fakeDraw);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    const fakeDraw = { image: "" };
    const response = await supertest(app).put("/api/draws/1").send(fakeDraw);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    const result = { affectedRows: 0 } as Result;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([result, []]);

    const fakeDraw = { name: "Invalid", image: "test.png" };
    const response = await supertest(app).put("/api/draws/999").send(fakeDraw);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

describe("DELETE /api/draws/:id", () => {
  it("should delete an existing draw successfully", async () => {
    const result = { affectedRows: 1 } as Result;
    jest
      .spyOn(databaseClient, "query")
      // 1er appel -> readById
      .mockResolvedValueOnce([
        [{ id: 1, name: "ToDelete", image: "wolf.png", user_id: 1 }] as Rows,
        [],
      ])
      // 2e appel -> delete
      .mockResolvedValueOnce([{ affectedRows: 1 } as Result, []]);

    const response = await supertest(app).delete("/api/draws/1");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    const result = { affectedRows: 0 } as Result;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([result, []]);

    const response = await supertest(app).delete("/api/draws/0");

    expect(response.status).toBe(404);
  });
});
