import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "usuarios" },
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
