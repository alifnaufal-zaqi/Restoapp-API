import Joi from "joi";

export const RestaurantPayloadSchema = Joi.object({
  restaurantName: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  idUser: Joi.string().required(),
  restaurantImage: Joi.object({
    mimetype: Joi.string()
      .valid(
        "image/apng",
        "image/avif",
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp"
      )
      .required(),
  }).unknown(),
});
