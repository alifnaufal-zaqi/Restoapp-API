import InvariantError from "../../exceptions/InvariantError.js";
import { RestaurantPayloadSchema } from "./schema.js";

export const RestaurantValidator = {
  validate: (payload) => {
    const { error } = RestaurantPayloadSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
