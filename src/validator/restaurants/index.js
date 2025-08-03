import InvariantError from "../../exceptions/InvariantError.js";
import { RestaurantPayloadSchema } from "./schema.js";

export const RestaurantValidator = {
  validate: (payload, file) => {
    const payloadToValidate = {
      ...payload,
      restaurantImage: {
        mimetype: file?.mimetype,
      },
    };

    const { error } = RestaurantPayloadSchema.validate(payloadToValidate);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
