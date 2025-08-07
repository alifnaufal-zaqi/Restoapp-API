import Joi from "joi";

export const MenusPayloadSchema = Joi.object({
  idCategory: Joi.string().required(),
  menuName: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  image: Joi.object({
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
