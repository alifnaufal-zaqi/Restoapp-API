import InvariantError from "../../exceptions/InvariantError.js";
import { UserProfilePayloadSchema } from "./schema.js";

export const UserProfileValidator = {
  validate: (payload, file) => {
    const payloadToValidate = {
      ...payload,
      photoProfile: {
        mimetype: file?.mimetype,
      },
    };

    const { error } = UserProfilePayloadSchema.validate(payloadToValidate);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
