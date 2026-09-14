import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema(
  {
    pacienteId: {
      type: String,
      required: true,
      trim: true,
    },
    pacienteNombre: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
    },
    hora: {
      type: String,
      required: true,
      trim: true,
    },
    motivo: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "atendido", "cancelado"],
      default: "pendiente",
    },
    especialidadId: {
      type: String,
      required: true,
      trim: true,
    },
    especialidadNombre: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Turno = mongoose.model("Turno", turnoSchema, "turnos");

export default Turno;
