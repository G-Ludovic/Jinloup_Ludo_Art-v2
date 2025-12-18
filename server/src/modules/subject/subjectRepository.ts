import databaseClient, { type Rows } from "../../../database/client";

class SubjectRepository {
  // Lire tous les sujets
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
         s.id, 
         s.title, 
         s.category_id, 
         c.name AS category_name, 
         s.creation_date
       FROM subject AS s
       JOIN category AS c ON s.category_id = c.id
       ORDER BY s.creation_date DESC`,
    );
    return rows;
  }

  // Lire un sujet par ID
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
         s.id, 
         s.title, 
         s.category_id, 
         c.name AS category_name, 
         s.creation_date
       FROM subject AS s
       JOIN category AS c ON s.category_id = c.id
       WHERE s.id = ?`,
      [id],
    );
    return rows[0];
  }
}

export default new SubjectRepository();
