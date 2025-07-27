import {
  PostAuthenticationPayload,
  PutAuthenticationPayload,
  DeleteAuthenticationPayload,
} from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

export const AuthenticationValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const { error } = PostAuthenticationPayload.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const { error } = PutAuthenticationPayload.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const { error } = DeleteAuthenticationPayload.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
