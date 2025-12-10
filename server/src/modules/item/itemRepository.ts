import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

// Type de l'item
export type Item = {
  id: number;
  title: string;
  user_id: number;
};

class ItemRepository {
  // CREATE
  async create(item: Omit<Item, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO item (title, user_id) VALUES (?, ?)",
      [item.title, item.user_id],
    );
    return result.insertId; // Retourne l'ID créé
  }

  // READ ONE
  async read(id: number): Promise<Item | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM item WHERE id = ?",
      [id],
    );
    return (rows[0] as Item) || null;
  }

  // READ ALL
  async readAll(): Promise<Item[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM item");
    return rows as Item[];
  }

  // UPDATE
  async update(id: number, item: Omit<Item, "id">): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE item SET title = ?, user_id = ? WHERE id = ?",
      [item.title, item.user_id, id],
    );
    return result.affectedRows; // Retourne le nombre de lignes modifiées
  }

  // DELETE
  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM item WHERE id = ?",
      [id],
    );
    return result.affectedRows; // Retourne le nombre de lignes supprimées
  }
}

export default new ItemRepository();
