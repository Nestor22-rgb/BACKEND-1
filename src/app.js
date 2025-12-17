const express = require("express");
const app = express();
const ProductManager = require("./managers/productManager.js");
const CartManager = require("./managers/cartManager.js");
const { rutaArchivoDinamic } = require("./config/config.js");


// Instanciar los Manegers
const productManager = new ProductManager();
const cartManager = new CartManager();

// productManager.readfile();

// MIDDEEWARES
app.use(express.json())  //BODY -> JSON
app.use(express.urlencoded( {extended: true }))  //FORMULARIO LEGA EN FORMATO JSON


app.get("/", (req, res) => {
    res.send("Helo World")
})

// RUTA DE PRODUCTOS  api/product/

// PROBAR TRAER LOS PRODUCTOS CON EL ASYN DESDE LOS JSON !

app.get("/api/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }
});

// GET	/:pid	Obtener producto por ID
app.get("/api/products/:pid", async (req, res) => {
   try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);

        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        res.json({ status: 'success', data: product });
    } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
});

// POST PRODUCT		Crear nuevo producto (ID se autogenera)
app.post("/api/products", async (req, res) => {
    try {
        
        const { nombre, precio, description, stock, } = req.body;

        const nuevoProducto = await productManager.addProduct(
            nombre, precio, description, stock
        );

        // console.log("Body que llega", req.body);
        

        if (!nuevoProducto) {
            return res.status(400).json({ status: 'error', message: 'Error al crear el producto. Verifique que todos los campos sean válidos y el código sea único.' });
        }
        
        res.status(201).json({ data: newProduct });
    } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
});

// PUT	/:pid	Actualizar campos del producto excepto el ID
app.put("/api/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const data = req.body;

    try {
        const updatedProduct = await productManager.updateProduct(pid, data);
        res.json({
            message: "Producto actualizado",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE	/:pid	Eliminar producto por ID (SOFT)
app.delete("/api/products/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const deleted = await productManager.softDeleteProduct(pid);

        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado"});
        }
        
        res.json({ status: "seccess", message: "Producto marcado como eliminado", product: deleted });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// <----------- CART ----------->

// POST	/	Crear nuevo carrito con ID único
app.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: "Carrito Creado", cart: newCart });
    } catch (error) {
        console.error("Error creando carrito:", error);
        res.status(500).json({ error: "Error Interno" });
    }
})

// GET	/:cid	Obtener todos los productos del carrito
app.get("/api/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
        return res.json(cart);

    } catch (error) {
        console.error("Error al obtener carrito", error);
        return res.status(500).json({ error: "Error interno" });
    }
});

// POST	/:cid/product/:pid	Agregar producto al carrito (aumenta quantity si ya existe)
app.post("/api/carts/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartManager.addProductToCart(cid, pid);

        if (!updatedCart) return res.status(404).json({ error: "Carrito no encontrado" });
        return res.json({ message: "Productos agregado al carrito" , cart: updatedCart });

    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        return res.status(500).json({ error: "Error Interno" });
    }
});


module.exports = app