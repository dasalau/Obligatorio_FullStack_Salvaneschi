import Joi from 'joi';

export const turnoSchema = Joi.object({
  pacienteId: Joi.string().required(),
  fecha: Joi.string().required(),
  hora: Joi.string().required(),
  motivo: Joi.string().trim().min(5).required(),
  estado: Joi.string().valid('pendiente', 'atendido', 'cancelado').default('pendiente'),
  especialidadId: Joi.string().required(),
  imagen: Joi.string().allow('').optional(),
});
