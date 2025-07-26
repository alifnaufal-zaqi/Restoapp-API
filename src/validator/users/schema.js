import Joi from "joi";

export const UserPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).max(16).required(),
});
