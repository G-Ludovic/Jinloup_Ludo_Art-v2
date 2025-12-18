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

  async readByCategoryId(categoryId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        m.id,
        m.content,
        m.sending_date,
        m.user_id,
        u.pseudo AS user_name,
        s.id AS subject_id,
        s.title AS subject_title,
        c.id AS category_id,
        c.name AS category_name
     FROM message m
     JOIN user u ON m.user_id = u.id
     JOIN subject s ON m.subject_id = s.id
     JOIN category c ON s.category_id = c.id
     WHERE c.id = ?
     ORDER BY m.sending_date DESC`,
      [categoryId],
    );

    return rows;
  }
}

export default new categoriesRepository();
