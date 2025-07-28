import Joi from "joi";

export const UserProfilePayloadSchema = Joi.object({
  address: Joi.string().required(),
  noTelp: Joi.string().required(),
  gender: Joi.string().required(),
  photoProfile: Joi.object({
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
