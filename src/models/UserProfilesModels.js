import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class UserProfilesModels {
  constructor(pool) {
    this._pool = pool;
  }

  async selectUserProfileByIdUser(idUser) {
    const query = {
      text: `SELECT users.username,
                users.email,
                user_profiles.address,
                user_profiles.no_telp,
                user_profiles.gender,
                user_profiles.photo_profile
                FROM user_profiles JOIN users
                ON user_profiles.id_user = users.id_user
                WHERE users.id_user = $1`,
      values: [idUser],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("User profile not found");
    }

    return result.rows[0];
  }

  async updateUserProfileByIdUser(
    idUser,
    { address, noTelp, gender, photoProfile }
  ) {
    const query = {
      text: "UPDATE user_profiles SET address = $1, no_telp = $2, gender = $3, photo_profile = $4 WHERE id_user = $5",
      values: [address, noTelp, gender, photoProfile, idUser],
    };

    await this._pool.query(query);
  }
}

export default UserProfilesModels;
