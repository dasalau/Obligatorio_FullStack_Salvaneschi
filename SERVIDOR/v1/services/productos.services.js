import Producto from "../models/producto.model.js";   

export const obtenerProductosService = async () => {
  
    const productos = await Producto.find();
    return productos;
   
};

export const crearProductoService = async (productoData) => {

    const producto = new Producto(productoData);
    await producto.save();
    return producto;
}

export const obtenerProductoPorIdService = async (id) => {
    const producto = await Producto.findById(id);
    return producto;
}
export const actualizarProductoService = async (id, producto) => {
  
    const productoActualizado = await Producto.findByIdAndUpdate(id, producto, { returnDocument: "after" });
    return productoActualizado;
}

export const eliminarProductoService = async (id) => {
    const producto = await Producto.findByIdAndDelete(id);
    return producto;
}