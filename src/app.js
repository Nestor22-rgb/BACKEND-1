const express = require("express");
const app = express();
const ProductManager = require("../productManager.js");
const CartManager = require("../cartManager.js");


// Instanciar los Manegers
const productManager = new ProductManager();
const cartManager = new CartManager();

// MIDDEEWARES
app.use(express.json())  //BODY -> JSON
app.use(express.urlencoded( {extended: true }))  //FORMULARIO LEGA EN FORMATO JSON


app.get("/", (req, res) => {
    res.send("Helo World")
})

// RUTA DE PRODUCTOS  api/product/

const product = [
    {
        "id": 1,
        "nombre": "Mochila Antirrobo",
        "precio": 50000,
        "description": "La Mochila Antirrobo es un modelo con apertura en la parte trasera que mantiene las pertenencias seguras.",
        "stock": 15,
        "deleted": false
    },
    {
        "id": 2,
        "nombre": "Matero Ecuador",
        "precio": 60000,
        "description": "Confeccionado en cordura cosida en efecto canelón, está envivado en sus bordes con pu a tono y forrado en silver (impermeable).",
        "stock": 15,
        "deleted": false
    },
    {
        "id": 3,
        "nombre": "Matero Armenia",
        "precio": 50000,
        "description": "El matero Armenia es un bolso tipo puffer confeccionado en sire canelón y forrado en silver.",
        "stock": 15,
        "deleted": false
    }
]

app.get("/api/product",  (req, res) => {
    try {
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});
    }
});


// POST PRODUCT


module.exports = app