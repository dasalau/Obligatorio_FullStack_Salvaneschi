import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
    },
    especialidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Especialidad",
      required: true,
    },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    motivo: { type: String, default: "" },
    estado: { type: String, default: "pendiente" },
    imagen: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true },
);

const Turno = mongoose.model("Turno", turnoSchema, "turnos");

export default Turno;
