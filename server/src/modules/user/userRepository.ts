import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

class UserRepository {
  async readAll() {
    const [users] = await databaseClient.query<Rows>("SELECT * FROM user");
    return users;
  }

  async read(id: number) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return user[0];
  }

  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return user[0];
  }

  async create(body: User) {
    const [user] = await databaseClient.query<Result>(
      "INSERT INTO user (email, password) VALUES (?, ?)",
      [body.email, body.password],
    );

    return user.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async updateRole(id: number, role: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET role = ? WHERE id = ?",
      [role, id],
    );
    return result.affectedRows;
  }

  async hasRelatedData(id: number) {
    // Check if user has subjects
    const [subjects] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) as count FROM subject WHERE user_id = ?",
      [id],
    );
    if (subjects[0].count > 0) return true;

    // Check messages
    const [messages] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) as count FROM message WHERE user_id = ?",
      [id],
    );
    if (messages[0].count > 0) return true;

    // Check draws
    const [draws] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) as count FROM draw WHERE user_id = ?",
      [id],
    );
    if (draws[0].count > 0) return true;

    // Check comments
    const [comments] = await databaseClient.query<Rows>(
      "SELECT COUNT(*) as count FROM comment WHERE user_id = ?",
      [id],
    );
    if (comments[0].count > 0) return true;

    return false;
  }
}

export default new UserRepository();
