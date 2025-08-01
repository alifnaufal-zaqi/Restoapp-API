import Joi from "joi";

export const OrderPayloadSchema = Joi.object({
  idPaymentMethod: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      idMenu: Joi.string().required(),
      idRestaurant: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      note: Joi.string(),
    })
  ),
});
