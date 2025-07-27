import Joi from "joi";

export const PostAuthenticationPayload = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

export const PutAuthenticationPayload = Joi.object({
  refreshToken: Joi.string().required(),
});

export const DeleteAuthenticationPayload = Joi.object({
  refreshToken: Joi.string().required(),
});
