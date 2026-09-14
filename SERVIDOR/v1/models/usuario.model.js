import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    plan: {
      type: String,
      enum: ["plus", "premium"],
      default: "plus",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

export default Usuario;
