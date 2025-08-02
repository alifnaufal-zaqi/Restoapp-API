import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";

class LikesModels {
  constructor(pool, menusModel) {
    this._pool = pool;
    this._menusModel = menusModel;
  }

  async isExistingLike(idUser, idMenu) {
    const query = {
      text: "SELECT * FROM likes WHERE id_user = $1 AND id_menu = $2",
      values: [idUser, idMenu],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async insertLikeMenu(idMenu, idUser) {
    const idLikes = `like-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO likes VALUES ($1, $2, $3) RETURNING id_like",
      values: [idLikes, idUser, idMenu],
    };

    await this._menusModel.verifyMenuExist(idMenu);
    const isLike = await this.isExistingLike(idUser, idMenu);

    if (isLike.length > 0) {
      throw InvariantError("You're already liked this menu");
    }

    const result = await this._pool.query(query);

    if (!result.rows[0].id_like) {
      throw new InvariantError("Failed to add like");
    }
  }

  async deleteLikeMenu(idMenu) {
    const query = {
      text: "DELETE FROM likes WHERE id_menu = $1",
      values: [idMenu],
    };

    await this._pool.query(query);
  }

  async selectLikeMenuByIdMenu(idMenu) {
    const query = {
      text: `SELECT COUNT(*) AS "likeCount" FROM likes WHERE id_menu = $1`,
      values: [idMenu],
    };

    const result = await this._pool.query(query);

    return parseInt(result.rows[0].likeCount);
  }
}

export default LikesModels;
