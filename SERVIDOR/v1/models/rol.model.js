import mongoose from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "roles" },
);

const Rol = mongoose.model("Rol", rolSchema);
export default Rol;
