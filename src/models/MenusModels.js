import { nanoid } from "nanoid";
import InvariantError from "../exceptions/InvariantError.js";
import NotFoundError from "../exceptions/NotFoundError.js";

class MenusModels {
  constructor(pool) {
    this._pool = pool;
  }

  async insertNewMenus({}) {}
}
