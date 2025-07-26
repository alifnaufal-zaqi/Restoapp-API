import { nanoid } from "nanoid";
import NotFoundError from "../exceptions/NotFoundError.js";
import InvariantError from "../exceptions/InvariantError.js";

class UsersModels {
  constructor(pool) {
    this._pool = pool;
  }

  async insertNewUser({ email, username, password, role }) {
    const idUser = `user-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO users (id_user, email, username, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id_user",
      values: [idUser, email, username, password, role],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_user) {
      throw new InvariantError("Failed adding new user");
    }

    return result.rows[0].id_user;
  }
}

export default UsersModels;
