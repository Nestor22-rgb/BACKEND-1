
const socket = io()

console.log("Cliente Socket.IO conectado")

socket.on("connect", () => {
  console.log("Conectado al servidor con ID:", socket.id)
})

socket.on("disconnect", () => {
  console.log("Desconectado del servidor")
})

socket.on("products", (products) => {
  const productsList = document.getElementById("productsList")
  if (!productsList) return

  productsList.innerHTML = products
  .filter(p => p.status === true)
  .map(p => `
    <li>
    ${p.nombre} - $${p.precio}
    <button class="delete-btn" data-id="${p.id}"> Eliminar </button>
    </li>
    `)
    .join("")

})

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id
    deleteProduct(id)
  }
})

function deleteProduct(id) {
  socket.emit("deleteProduct", id)
}

const form = document.getElementById("productForm")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const product = {
    nombre: document.getElementById("nombre").value,
    description: document.getElementById("description").value, 
    precio: Number(document.getElementById("precio").value),
    stock: Number(document.getElementById("stock").value),
    status: true
  }

  socket.emit("addProduct", product)

  form.reset()
})