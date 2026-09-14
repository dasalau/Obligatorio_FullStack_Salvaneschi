import { crearProductoService, 
    obtenerProductoPorIdService,
    obtenerProductosService,
    actualizarProductoService,
    eliminarProductoService } from "../services/productos.services.js";

export const obtenerProductos = async (req, res) => {
    const productos = await obtenerProductosService();
    res.json(productos);
}

export const crearProducto = async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const producto = await crearProductoService({ nombre, precio, descripcion });
    res.status(201).json(producto);
}
export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    res.json(producto);
}

export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await actualizarProductoService(id, req.body);
    res.json(producto);
}

export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await eliminarProductoService(id);
    res.json(producto);
}