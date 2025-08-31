-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ferrepoco_db;

-- Usar la base de datos recién creada
USE ferrepoco_db;

-- -----------------------------------------------------
-- Estructura para la gestión de usuarios y roles
-- -----------------------------------------------------

-- Tabla para los roles de usuario (Administrador, Empleado, Cliente)
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla para la información de los usuarios del sistema
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- -----------------------------------------------------
-- Estructura para la gestión de productos e inventario
-- -----------------------------------------------------

-- Tabla para organizar los productos por categorías
CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla para la información de los productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Tabla para la gestión del inventario
CREATE TABLE inventario (
    id_inventario INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT UNIQUE NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0),
    fecha_ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Tabla para registrar las alertas de bajo stock
CREATE TABLE alertas_stock (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    id_inventario INT,
    nivel_minimo INT NOT NULL,
    stock_actual INT NOT NULL,
    fecha_alerta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_inventario) REFERENCES inventario(id_inventario)
);

-- -----------------------------------------------------
-- Estructura para la gestión de pedidos y pagos
-- -----------------------------------------------------

-- Tabla para los pedidos de los clientes
CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_pedido VARCHAR(50) NOT NULL,
    total_pedido DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario)
);

-- Tabla para el detalle de cada pedido
CREATE TABLE detalle_pedido (
    id_detalle_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Tabla para los métodos de pago
CREATE TABLE metodos_pago (
    id_metodo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_metodo VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla para registrar los pagos de los pedidos
CREATE TABLE pagos (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT UNIQUE NOT NULL,
    id_metodo INT NOT NULL,
    monto_pagado DECIMAL(10, 2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo)
);

-- -----------------------------------------------------
-- Estructura para el análisis y reportes
-- -----------------------------------------------------

-- Tabla para registrar las búsquedas de los clientes (para análisis de preferencias)
CREATE TABLE busquedas_clientes (
    id_busqueda INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    termino_busqueda VARCHAR(255) NOT NULL,
    fecha_busqueda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario)
);