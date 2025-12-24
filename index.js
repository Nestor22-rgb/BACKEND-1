const app = require("./src/app.js")
const http = require("http")
const { Server } = require("socket.io")
const ProductManager = require("./src/managers/productManager.js")
const productManager = new ProductManager("./data/products.json")

const PORT = 3000

// Crear servidor HTTP
const server = http.createServer(app)

// Crear socket server
const io = new Server(server)

  ///// INICIALIZAR SOCKET.IO
io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    const products = await productManager.getProducts()
    socket.emit("products", products)

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    })


    // ESCUCHAR Y GUARDAR EN EL SERVIDOR
  socket.on("addProduct", async (productData) => {
    await productManager.addProduct(productData)

    const products = await productManager.getProducts()

    io.emit("products", products)
  })


  //ESCUCHAR EVENTO DEL CLIENTE

  socket.on("deleteProduct", async (productId) => {
    await productManager.softDeleteProduct(productId)

    const products = await productManager.getProducts()
    io.emit("products", products)
  })
})



// Levantar servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
