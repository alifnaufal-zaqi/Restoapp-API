import InvariantError from "../../exceptions/InvariantError.js";
import { OrderPayloadSchema } from "./schema.js";

export const OrderPayloadValidator = {
  validate: (payload) => {
    const { error } = OrderPayloadSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
