import Joi from 'joi';

export const planSchema = Joi.object({
  plan: Joi.string().valid('plus', 'premium').required(),
});
