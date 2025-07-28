import Joi from "joi";

export const RestaurantPayloadSchema = Joi.object({
  restaurantName: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  idUser: Joi.string().required(),
});
