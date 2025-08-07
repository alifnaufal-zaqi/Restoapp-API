import Joi from "joi";

export const PostAuthenticationPayload = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});
