
const { rutaArchivoDinamic } = require("../config/config.js");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const rutaProducts = rutaArchivoDinamic("products.json");

class ProductManager {
    constructor() {
        this.path = rutaProducts;
        this.products = [];
    }

    // LEER ARCHIVO
    async readFile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            
            this.products = JSON.parse(data);
        } catch (error) {
            console.log("Error al leer archivo:", error.message);
            
            this.products = [];
        }
        return this.products;
    }

    // ESCRIBIR ARCHIVO
    async writeFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error("Error al escribir el archivo", error.message);
            throw error 
        }
    }

    //Obtener todos los productos
    async getProducts() {
        await this.readFile();
        return this.products;
    }

	//Obtener producto por ID
    async getProductById(id) {
        await this.readFile();
        const products = this.products.find(p=> p.id === id);
        return products || null;
    }

	//Crear nuevo producto 
    async addProduct(nombre, precio, description, stock) {

           await this.readFile();

        if (!nombre || precio == null || !description || stock == null) {
            console.log("Todos los campos son obligatorios");
            return null;
        }   

        const nuevoProducto = {
            id: uuidv4(),
            nombre, 
            precio: Number(precio), 
            description,
            stock: Number(stock),
            status: true,
        };

        this.products.push(nuevoProducto);
        console.log("Producto Agregado localmente, ahora hay:", this.products.length);
        
        await this.writeFile();
        return nuevoProducto;
        
    }

	//Actualizar producto 
    async updateProduct(id, camposActualizar) {
        
          await this.readFile();

        const index = this.products.findIndex(p => p.id === id);
        if (index === -1)
        return null;
        if (camposActualizar.id) delete camposActualizar.id;

        this.products[index] = {
            ...this.products[index],
            ...camposActualizar
        };

        await this.writeFile();
        return this.products[index]

    }


	//Eliminar producto por ID
    async softDeleteProduct(id) {

        await this.getProducts();

        const index = this.products.findIndex(p => p.id === id);
        
        if (index === -1) {
            return null;
        }

        if (this.products[index].status === false) {
            return this.products[index];
        }

        this.products[index].status = false;

        await this.writeFile();
        return this.products[index];
    }    
    
}

 module.exports = ProductManager;