// Fichier qui comportera les requêtes SQL relatives à la table draw
import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class drawRepository {
  async readAll() {
    const [rows] = await databaseClient.query("SELECT * FROM draw");

    return rows;
  }

  async readById(id: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM draw WHERE id = ?",
      [id],
    );

    return rows[0];
  }

  async update(body: Draw, id: string) {
    const [rows] = await databaseClient.query<Result>(
      "UPDATE draw SET image = ? WHERE id = ?",
      [body.image, id],
    );

    return rows.affectedRows;
  }

  async create(body: Draw) {
    const [rows] = await databaseClient.query<Result>(
      "INSERT INTO draw (name, image) VALUES (?, ?)",
      [body.name, body.image],
    );

    return rows.affectedRows;
  }

  async delete(id: string) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM draw WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new drawRepository();
