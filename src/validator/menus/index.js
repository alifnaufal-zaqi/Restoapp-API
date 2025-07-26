import { MenusPayloadSchema } from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

export const MenusValidator = {
  validate: (payload, file) => {
    const payloadToValidate = {
      ...payload,
      image: {
        mimetype: file?.mimetype,
      },
    };

    const { error } = MenusPayloadSchema.validate(payloadToValidate);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
