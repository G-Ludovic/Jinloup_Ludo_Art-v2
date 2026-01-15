import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

export type Draw = {
  id?: number;
  name: string;
  image: string;
};

class DrawRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM draw");
    return rows;
  }

  async readById(id: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM draw WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  async create(draw: Draw) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO draw (name, image) VALUES (?, ?)",
      [draw.name, draw.image],
    );
    return result.insertId; // <-- on renvoie l'ID, utile pour tests ou logs
  }

  async update(id: string, draw: Partial<Draw>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE draw SET name = ?, image = ? WHERE id = ?",
      [draw.name, draw.image, id],
    );
    return result.affectedRows;
  }

  async delete(id: string) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM draw WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new DrawRepository();
