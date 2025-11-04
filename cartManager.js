const { rutaArchivoDinamic } = require("./config/config.js");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const rutacart = rutaArchivoDinamic("carts.json");

class CartManager {
    constructor() {
        this.path = rutacart;
        this.carts = [];
    }

    // Lee los carritos del archivo
    async readFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    // Guarda los carritos en el archivo
    async writeFile() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    // Crear nuevo carrito
    async createCart() {
        await this.readFile();
        
        const nuevoCarrito = {
            id: uuidv4(),
            products: []
        };

        this.carts.push(nuevoCarrito);
        await this.writeFile();
        return nuevoCarrito;
    }

    // Obtener productos del carrito
    async getCartById(id) {
        await this.readFile();
        const cart = this.carts.find(c => c.id === id);
        return cart || null;
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId) {
        await this.readFile();
        
        const cartIndex = this.carts.findIndex(c => c.id === cartId);
        
        if (cartIndex === -1) {
            console.log("Carrito no encontrado");
            return null;
        }

        // Verifica si el producto ya esta en el carrito
        const existingProductIndex = this.carts[cartIndex].products.findIndex(p => p.product === productId);
        
        if (existingProductIndex !== -1) {
            // Si existe, agrega 1 a la cantidad
            this.carts[cartIndex].products[existingProductIndex].quantity += 1;
        } else {
            // Si no existe (quantity = 1)
            this.carts[cartIndex].products.push({
                product: productId,
                quantity: 1
            });
        }

        await this.writeFile();
        return this.carts[cartIndex];
    }
}

module.exports = CartManager;