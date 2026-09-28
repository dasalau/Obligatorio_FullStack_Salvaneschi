import Joi from "joi";

export const planSchema = Joi.object({
  plan: Joi.string().valid("plus", "premium").required().messages({
    "any.only": "El plan debe ser plus o premium",
    "any.required": "El plan es obligatorio",
    "string.empty": "El plan no puede estar vacío",
  }),
});
