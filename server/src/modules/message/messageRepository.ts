import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

interface Message {
  id?: number;
  content: string;
  file?: string | null;
  sending_date?: string | null;
  user_id: number;
  subject_id: number;
}

class MessageRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        m.id,
        m.content,
        m.file,
        m.sending_date,
        m.user_id,
        u.pseudo AS user_name,
        m.subject_id,
        s.title AS subject_title,
        s.category_id,            -- Ajout clé étrangère vers la catégorie
        c.name AS category_name   -- Nom de la catégorie correspondante
     FROM message m
     JOIN user u ON m.user_id = u.id
     JOIN subject s ON m.subject_id = s.id
     JOIN category c ON s.category_id = c.id  -- Liaison vers la catégorie
     ORDER BY m.id DESC`,
    );

    return rows;
  }

  async readBySubjectId(subjectId: number) {
    const [rows] = await databaseClient.query(
      `SELECT m.id, m.content, m.file, m.sending_date,
              m.user_id, m.subject_id,
              u.pseudo AS user_name,
              s.title AS subject_title
       FROM message m
       JOIN user u ON m.user_id = u.id
       JOIN subject s ON m.subject_id = s.id
       WHERE m.subject_id = ?
       ORDER BY m.id DESC`,
      [subjectId],
    );
    return rows;
  }

  async readById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM message WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  async create(body: Message) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO message (content, file, sending_date, user_id, subject_id)
       VALUES (?, ?, CURDATE(), ?, ?)`,
      [body.content, body.file ?? null, body.user_id, body.subject_id],
    );
    return result.insertId;
  }

  async update(id: string, body: Partial<Message>) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE message 
       SET content = ?, file = ?, sending_date = CURDATE() 
       WHERE id = ?`,
      [body.content, body.file ?? null, id],
    );
    return result.affectedRows;
  }

  async delete(id: string) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM message WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async checkSubjectExists(subjectId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM subject WHERE id = ?",
      [subjectId],
    );
    return rows.length > 0;
  }
}

export default new MessageRepository();
