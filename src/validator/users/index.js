import { UserPayloadSchema } from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

export const UserValidator = {
  validate: (payload) => {
    const { error } = UserPayloadSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
