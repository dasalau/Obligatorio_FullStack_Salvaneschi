import express from "express";
import { crearProducto,
    obtenerProductoPorId,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto } from "../controllers/producto.controller.js";

const router = express.Router();

router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.get("/:id", obtenerProductoPorId);
router.patch("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;