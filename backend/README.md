# Backend Ferrepoco

Este directorio contiene la configuración inicial del backend usando Node.js y Express.

## Scripts

- `npm install` - Instala las dependencias.
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon.
- `npm start` - Ejecuta el servidor en modo producción.

## Configuración

Duplica `.env.example` a `.env` y define tus variables de entorno:

```
PORT=3000
```

## Creacion de la base de datos
 1. Creación de la base de datos
CREATE DATABASE ferrepocobd;

-- 2. Selección de la base de datos para usarla
USE ferrepocobd;

-- 3. Creación de las tablas

-- Tabla para almacenar los usuarios del sistema.
[cite_start]-- 
Consolida los roles de Cliente, Empleado y Administrador en una sola tabla[cite: 67].


CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    [cite_start]nombre VARCHAR(100) NOT NULL, -- [cite: 66]
    [cite_start]correo VARCHAR(100) NOT NULL UNIQUE, -- [cite: 66]
    [cite_start]contrasena VARCHAR(255) NOT NULL, -- [cite: 66]
    rol ENUM('Cliente', 'Empleado', 'Administrador') NOT NULL
);

-- Tabla para almacenar la información de los productos de la ferretería.


CREATE TABLE PRODUCTO (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    [cite_start]nombre VARCHAR(100) NOT NULL, -- [cite: 71]
    [cite_start]descripcion TEXT, -- [cite: 71]
    [cite_start]precio DECIMAL(10, 2) NOT NULL, -- [cite: 71]
    [cite_start]stock INT NOT NULL DEFAULT 0 -- [cite: 71]
);

-- Tabla para almacenar la cabecera de los pedidos realizados por los clientes.

CREATE TABLE PEDIDO (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    [cite_start]estado VARCHAR(50) NOT NULL, -- [cite: 69]
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    [cite_start]FOREIGN KEY (id_cliente) REFERENCES USUARIO(id_usuario) -- Un pedido es realizado por un Cliente[cite: 61, 70].
);

-- Tabla de detalle para relacionar los productos con los pedidos.
-- Permite que un pedido tenga múltiples productos.

CREATE TABLE DETALLE_PEDIDO (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido), -- Un detalle pertenece a un Pedido.
    [cite_start]FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) -- Un detalle corresponde a un Producto[cite: 72].
);
