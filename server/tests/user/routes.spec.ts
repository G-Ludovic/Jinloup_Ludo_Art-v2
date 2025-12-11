import argon2 from "argon2";
import type { NextFunction, Response } from "express";
import type { Request } from "express";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import databaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

import userActions from "../../src/modules/user/userActions";

process.env.APP_SECRET = "test_secret";

// MOCK verifyToken avant import de app
jest
  .spyOn(userActions, "verifyToken")
  .mockImplementation(
    (
      req: AuthRequest,
      res: Response,
      next: NextFunction,
    ): Response | undefined => {
      // Injecte un utilisateur fictif pour les tests
      req.user = { id: 1, email: "mock@mail.com" };
      next();
      return undefined;
    },
  );

// Puis on importe app
import app from "../../src/app";

// Réinitialisation après chaque test
afterEach(() => {
  jest.restoreAllMocks();
});

// GET /api/users
describe("GET /api/users", () => {
  it("should fetch all users successfully", async () => {
    const rows = [{ id: 1, email: "test@mail.com" }] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// GET /api/users/:id
describe("GET /api/users/:id", () => {
  it("should fetch a single user successfully", async () => {
    const rows = [{ id: 1, email: "john@mail.com" }] as Rows;
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([rows, []]);

    const response = await supertest(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    jest.spyOn(databaseClient, "query").mockResolvedValueOnce([[], []]);

    const response = await supertest(app).get("/api/users/999");

    expect(response.status).toBe(404);
  });
});

// POST /api/user
describe("POST /api/user", () => {
  it("should create a new user successfully", async () => {
    jest
      .spyOn(databaseClient, "query")
      .mockResolvedValueOnce([{ affectedRows: 1 } as Result, []]);
    jest.spyOn(argon2, "hash").mockResolvedValueOnce("hashed_pwd");

    const response = await supertest(app).post("/api/user").send({
      email: "new@mail.com",
      password: "test1234",
      confirmPassword: "test1234",
      pseudo: "TestUser",
    });

    expect(response.status).toBe(201);
    expect(response.body).toContain(
      "Congratulations, your account has been created successfully !",
    );
  });
});

// POST /api/login
describe("POST /api/login", () => {
  it("should log in successfully and set cookie", async () => {
    const fakeUser = { id: 1, email: "john@mail.com", password: "hashed_pwd" };

    jest
      .spyOn(databaseClient, "query")
      .mockResolvedValueOnce([[fakeUser] as Rows, []]);
    jest.spyOn(argon2, "verify").mockResolvedValueOnce(true);
    jest.spyOn(jwt, "sign").mockImplementation(() => "fakeToken");

    const response = await supertest(app)
      .post("/api/login")
      .send({ email: "john@mail.com", password: "test123" });

    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(response.text).toContain("logged in");
  });
});

// POST /api/logout
describe("POST /api/logout", () => {
  it("should clear the token cookie", async () => {
    const response = await supertest(app).post("/api/logout");

    expect(response.status).toBe(200);
  });
});

// GET /api/refresh
describe("GET /api/refresh", () => {
  it("should refresh the token successfully", async () => {
    const oldToken = "oldToken";
    const newToken = "newToken";

    jest
      .spyOn(jwt, "verify")
      .mockImplementation(() => ({ id: 1, email: "a@mail.com" }));
    jest.spyOn(jwt, "sign").mockImplementation(() => newToken);

    const response = await supertest(app)
      .get("/api/refresh")
      .set("Cookie", [`token=${oldToken}`]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "a@mail.com");
  });

  it("should fail if no token is provided", async () => {
    const response = await supertest(app).get("/api/refresh");

    // refreshToken renvoie 500 si pas de token
    expect(response.status).toBe(500);
  });
});
