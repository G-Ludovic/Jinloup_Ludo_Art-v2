import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

class UserRepository {
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
}

export default new UserRepository();
