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
    const fields = [];
    const values = [];
    if (draw.name !== undefined) {
      fields.push("name = ?");
      values.push(draw.name);
    }
    if (draw.image !== undefined) {
      fields.push("image = ?");
      values.push(draw.image);
    }
    if (fields.length === 0) return 0;

    const query = `UPDATE draw SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
    const [result] = await databaseClient.query<Result>(query, values);
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
