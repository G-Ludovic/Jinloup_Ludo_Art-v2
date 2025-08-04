import databaseClient, { type Rows } from "../../../database/client";

class categoriesRepository {
  async readAll() {
    const [rows] = await databaseClient.query("SELECT * FROM category");

    return rows;
  }

  async readById(id: string) {
    const [rows] = await databaseClient.query(
      "SELECT * FROM category WHERE id = ?",
      [id],
    );
    return rows;
  }
}

export default new categoriesRepository();
