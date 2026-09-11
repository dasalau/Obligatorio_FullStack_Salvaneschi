import Joi from 'joi';

export const crearJuesgosSchema = Joi.object({
  nombre: Joi.string().trim().lowercase().required().min(5).max(50).messages({
    'string.base': 'El nombre del juego debe ser una cadena de texto',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.min': 'El nombre del juego debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre del juego no puede tener más de {#limit} caracteres',
  }),
  descripcion: Joi.string().trim().required().min(10).max(500).messages({
    'string.base': 'La descripción del juego debe ser una cadena de texto',
    'string.empty': 'La descripción del juego no puede estar vacía',
    'string.min': 'La descripción del juego debe tener al menos {#limit} caracteres',
    'string.max': 'La descripción del juego no puede tener más de {#limit} caracteres',
  }),
  precio: Joi.number().required().min(0).messages({
    'number.base': 'El precio del juego debe ser un número',
    'number.empty': 'El precio del juego no puede estar vacío',
    'number.min': 'El precio del juego no puede ser negativo',
  }),
});

export const obtenerJuegoPorNombreSchema = Joi.object({
  nombre: Joi.string().trim().lowercase().required().min(5).max(50).messages({
    'string.base': 'El nombre del juego debe ser una cadena de texto',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.min': 'El nombre del juego debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre del juego no puede tener más de {#limit} caracteres',
  }),
});