import { nanoid } from "nanoid";
import AuthenticationError from "../exceptions/AuthenticationError.js";
import InvariantError from "../exceptions/InvariantError.js";
import bcrypt from "bcryptjs";

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

  async verifyUserCredential({ email, password }) {
    const query = {
      text: "SELECT id_user, username, role, email password FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError("Invalid Credentials");
    }

    const { password: hashedPassword } = result.rows[0];
    const match = bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Invalid Credentials");
    }

    return result.rows[0];
  }

  async verifyNewEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError("Email sudah tersedia");
    }
  }
}

export default UsersModels;
