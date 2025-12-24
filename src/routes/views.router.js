const { Router } = require("express");
const ProductManager = require("../managers/productManager");

const router = Router();
const productManager = new ProductManager();

// HOME → lista estática
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

// REAL TIME PRODUCTS → lista dinámica
router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});

module.exports = router;