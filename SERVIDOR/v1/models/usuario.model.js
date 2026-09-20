import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ["plus", "premium"], default: "plus" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "usuarios" },
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
