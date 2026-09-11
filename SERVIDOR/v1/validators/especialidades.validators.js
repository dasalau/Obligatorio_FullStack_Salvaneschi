import Joi from 'joi';

export const especialidadSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required(),
  descripcion: Joi.string().trim().min(3).required(),
});
