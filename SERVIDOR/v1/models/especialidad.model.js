import mongoose from "mongoose";

const especialidadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Especialidad = mongoose.model(
  "Especialidad",
  especialidadSchema,
  "especialidades",
);

export default Especialidad;
