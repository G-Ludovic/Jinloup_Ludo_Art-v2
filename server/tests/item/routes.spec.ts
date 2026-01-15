// Importer la bibliothèque supertest pour effectuer des requêtes HTTP
import supertest from "supertest";

// Importer l'application Express
import app from "../../src/app";

// Importer le client de base de données
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

// Restaurez toutes les fonctions simulées après chaque test
afterEach(() => {
  jest.restoreAllMocks();
});

// Suite de tests pour la route GET /api/items
describe("GET /api/items", () => {
  it("should fetch items successfully", async () => {
    // Simuler les lignes vides renvoyées par la base de données
    const rows = [] as Rows;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Envoyer une requête GET au point de terminaison /api/items
    const response = await supertest(app).get("/api/items");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Suite de tests pour la route GET /api/items/:id
describe("GET /api/items/:id", () => {
  it("should fetch a single item successfully", async () => {
    // Lignes fictives renvoyées par la base de données
    const rows = [{}] as Rows;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Envoyer une requête GET au point de terminaison /api/items/:id
    const response = await supertest(app).get("/api/items/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Simuler les lignes vides renvoyées par la base de données
    const rows = [] as Rows;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Envoyer une requête GET au point de terminaison /api/items/:id avec un ID invalide
    const response = await supertest(app).get("/api/items/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Suite de tests pour la route POST /api/items
describe("POST /api/items", () => {
  it("should add a new item successfully", async () => {
    // Résultat simulé de la requête de base de données
    const result = { insertId: 1 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Données d'article fictives
    const fakeItem = { title: "foo", user_id: 0 };

    // Envoyer une requête POST au point de terminaison /api/items avec un item de test
    const response = await supertest(app).post("/api/items").send(fakeItem);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Résultat simulé de la requête de base de données
    const result = { insertId: 1 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Données d'article fictives avec identifiant utilisateur manquant
    const fakeItem = { title: "foo" };

    // Envoyer une requête POST au point de terminaison /api/items avec un item de test
    const response = await supertest(app).post("/api/items").send(fakeItem);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});

// Suite de tests pour la route PUT /api/items/:id
describe("PUT /api/items/:id", () => {
  it("should update an existing item successfully", async () => {
    // Résultat simulé de la requête de base de données
    const result = { affectedRows: 1 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Données d'article fictives
    const fakeItem = { title: "foo", user_id: 0 };

    // Envoyer une requête PUT au point de terminaison /api/items/:id avec un item de test
    const response = await supertest(app).put("/api/items/42").send(fakeItem);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    // Résultat simulé de la requête de base de données
    const result = { affectedRows: 1 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Données d'article fictives avec identifiant utilisateur manquant
    const fakeItem = { title: "foo" };

    // Envoyer une requête PUT au point de terminaison /api/items/:id avec un item de test
    const response = await supertest(app).put("/api/items/42").send(fakeItem);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Résultat simulé de la requête de base de données
    const result = { affectedRows: 0 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Données d'article fictives avec identifiant utilisateur manquant
    const fakeItem = { title: "foo", user_id: 0 };

    // Envoyer une requête PUT au point de terminaison /api/items/:id avec un item de test
    const response = await supertest(app).put("/api/items/43").send(fakeItem);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Suite de tests pour la route DELETE /api/items/:id
describe("DELETE /api/items/:id", () => {
  it("should delete an existing item successfully", async () => {
    // Résultat simulé de la requête de base de données
    const result = { affectedRows: 1 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Envoyer une requête DELETE au point de terminaison /api/items/:id
    const response = await supertest(app).delete("/api/items/42");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Résultat simulé de la requête de base de données
    const result = { affectedRows: 0 } as Result;

    // Simuler l'implémentation de la méthode de requête de base de données
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Envoyer une requête DELETE au point de terminaison /api/items/:id
    const response = await supertest(app).delete("/api/items/43");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
