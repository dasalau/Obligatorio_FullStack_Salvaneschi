import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Paciente = mongoose.model("Paciente", pacienteSchema, "pacientes");

export default Paciente;
