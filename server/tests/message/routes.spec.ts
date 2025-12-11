import supertest from "supertest";
import databaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";
import app from "../../src/app";

afterEach(() => {
  jest.restoreAllMocks();
});

// GET /api/message
describe("GET /api/message", () => {
  it("should fetch all messages successfully", async () => {
    const rows = [
      { id: 1, content: "Hello world", user_id: 1, subject_id: 2 },
    ] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/message");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });

  it("should fetch messages by subject_id successfully", async () => {
    const rows = [
      { id: 1, content: "Hello topic", subject_id: 5, user_id: 2 },
    ] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/message?subject_id=5");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// GET /api/message/:id
describe("GET /api/message/:id", () => {
  it("should fetch a single message successfully", async () => {
    const rows = [{ id: 1, content: "Hi there!" }] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/message/1");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    const rows = [] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/message/999");

    expect(response.status).toBe(404);
  });
});

//
// POST /api/message
describe("POST /api/message", () => {
  it("should add a new message successfully", async () => {
    const result = { insertId: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      // 1er appel : INSERT
      .mockResolvedValueOnce([result, []])
      // 2e appel : SELECT readById
      .mockResolvedValueOnce([
        [{ id: 1, content: "Hello", user_id: 1, subject_id: 2 }] as Rows,
        [],
      ]);

    const fakeMessage = { content: "Hello", user_id: 1, subject_id: 2 };
    const response = await supertest(app)
      .post("/api/message")
      .send(fakeMessage);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", result.insertId);
    expect(response.body).toHaveProperty("content", "Hello");
  });

  it("should fail if content is missing", async () => {
    const fakeMessage = { user_id: 1, subject_id: 2 };
    const response = await supertest(app)
      .post("/api/message")
      .send(fakeMessage);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should fail if user_id or subject_id is missing", async () => {
    const fakeMessage = { content: "No IDs" };
    const response = await supertest(app)
      .post("/api/message")
      .send(fakeMessage);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

// PUT /api/message/:id
describe("PUT /api/message/:id", () => {
  it("should update an existing message successfully", async () => {
    jest
      .spyOn(databaseClient, "query")
      // 1. readById (message existe)
      .mockResolvedValueOnce([
        [{ id: 1, content: "Old message", file: null }] as Rows,
        [],
      ])
      // 2. update()
      .mockResolvedValueOnce([{ affectedRows: 1 } as Result, []])
      // 3. readById (après update)
      .mockResolvedValueOnce([
        [{ id: 1, content: "Updated!", file: null }] as Rows,
        [],
      ]);

    const fakeMessage = { content: "Updated!" };
    const response = await supertest(app)
      .put("/api/message/1")
      .send(fakeMessage);

    expect(response.status).toBe(200);
    expect(response.body.content).toBe("Updated!");
  });

  it("should fail if content is missing", async () => {
    const fakeMessage = { content: "" };
    const response = await supertest(app)
      .put("/api/message/1")
      .send(fakeMessage);

    expect(response.status).toBe(400);
  });

  it("should fail if message not found", async () => {
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([[], []]); // readById retourne vide

    const fakeMessage = { content: "Updated!" };
    const response = await supertest(app)
      .put("/api/message/999")
      .send(fakeMessage);

    expect(response.status).toBe(404);
  });
});

// DELETE /api/message/:id
describe("DELETE /api/message/:id", () => {
  it("should delete an existing message successfully", async () => {
    jest
      .spyOn(databaseClient, "query")
      // 1. readById
      .mockResolvedValueOnce([
        [{ id: 1, content: "To delete", file: null }] as Rows,
        [],
      ])
      // 2. delete()
      .mockResolvedValueOnce([{ affectedRows: 1 } as Result, []]);

    const response = await supertest(app).delete("/api/message/1");

    expect(response.status).toBe(204);
  });

  it("should fail if message not found", async () => {
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([[], []]);

    const response = await supertest(app).delete("/api/message/999");

    expect(response.status).toBe(404);
  });
});
