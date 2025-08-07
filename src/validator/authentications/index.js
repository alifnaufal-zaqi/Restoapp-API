import { PostAuthenticationPayload } from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

export const AuthenticationValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const { error } = PostAuthenticationPayload.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
