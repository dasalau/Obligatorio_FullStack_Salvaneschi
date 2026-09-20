import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    maxTurnosActivos: { type: Number, default: 4 },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "planes" },
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
