

# Backend – Primera Entrega

Gestión de Productos y Carritos con Node.js y Express

## Descripción

Este proyecto corresponde a la primera entrega del curso de Backend, donde se desarrolla un servidor en Node.js con Express que permite gestionar productos y carritos, utilizando archivos JSON como sistema de persistencia.

El objetivo principal es implementar un CRUD básico de productos y las operaciones fundamentales de carritos, respetando las consignas del trabajo práctico.


---

# Tecnologías utilizadas

Node.js

Express

UUID

File System (fs)

Postman (para pruebas)



---

# Estructura del proyecto

Proyecto/
│
├── data/
│   ├── products.json
│   └── carts.json
│
├── src/
│   ├── config/
│   │   └── config.js
│   │
│   ├── managers/
│   │   ├── productManager.js
│   │   └── cartManager.js
│   │
│   ├── routes/
│   │   ├── products.router.js
│   │   └── carts.router.js
│   │
│   └── app.js
│
├── index.js
└── package.json


---

# Inicialización del proyecto

1. Instalar dependencias:



npm install

2. Ejecutar el servidor:



npm run dev

El servidor se levanta en:

http://localhost:3000


---

# Endpoints de Productos (/api/products)

## Obtener todos los productos

GET

/api/products


---

## Obtener producto por ID

GET

/api/products/:pid


---

## Crear un nuevo producto

POST

/api/products

Body (JSON):

{
  "nombre": "Producto ejemplo",
  "precio": 1000,
  "description": "Descripción del producto",
  "stock": 10
}


---

## Actualizar un producto

PUT

/api/products/:pid

Body (JSON):

{
  "precio": 2000,
  "stock": 5
}


---

## Eliminar producto (Soft Delete)

DELETE

/api/products/:pid

El producto no se elimina físicamente del archivo, sino que se marca con:

"status": false


---

🛒 Endpoints de Carritos (/api/carts)

## Crear un carrito nuevo

POST

/api/carts

Se genera un carrito con ID único y un array de productos vacío.


---

## Obtener carrito por ID

GET

/api/carts/:cid

Devuelve el carrito con todos los productos agregados.


---

## Agregar un producto al carrito

POST

/api/carts/:cid/product/:pid

Si el producto no existe en el carrito, se agrega con quantity: 1

Si ya existe, se incrementa la cantidad en +1



---

# Persistencia de datos

Los datos se almacenan en archivos JSON dentro de la carpeta data/:

products.json

carts.json


La lectura y escritura se realiza mediante el módulo fs.


---

## Estado del proyecto

✔ CRUD de productos completo
✔ Soft delete implementado
✔ Carritos con ID único
✔ Agregado de productos a carritos
✔ Persistencia en archivos
✔ Probado con Postman


---

# Aprendizajes

Uso de Express y rutas

Manejo de parámetros dinámicos

Lectura y escritura de archivos JSON

Separación de responsabilidades (routes / managers)

Manejo de errores y validaciones

Uso correcto de métodos HTTP (GET, POST, PUT, DELETE)



---

# Autor

Proyecto desarrollado como parte del curso de Backend.


---
