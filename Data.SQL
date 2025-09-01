-- ==============================
-- INSERT MASIVO DE DATOS DE PRUEBA
-- ==============================

-- Roles
INSERT INTO roles (nombre_rol) VALUES
('Administrador'),
('Empleado'),
('Cliente');

-- Usuarios
INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, id_rol) VALUES
('Juan', 'Pérez', 'juan.perez@ferrepoco.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 1),
('María', 'López', 'maria.lopez@ferrepoco.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 2),
('Carlos', 'Ramírez', 'carlos.ramirez@gmail.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 3),
('Ana', 'Martínez', 'ana.martinez@gmail.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 3),
('Luis', 'Fernández', 'luis.fernandez@gmail.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 3),
('Sofía', 'Gómez', 'sofia.gomez@gmail.com', '$2a$10$Q5J5U59axMrmWnDTfcy5G..z9Dof3sJHOOGzb6i5LDOs3GwSN5.mC', 2);

-- Categorías
INSERT INTO categorias (nombre_categoria) VALUES
('Herramientas manuales'),
('Herramientas eléctricas'),
('Materiales de construcción'),
('Pinturas'),
('Ferretería general');

-- Productos
INSERT INTO productos (nombre_producto, descripcion, precio, id_categoria) VALUES
('Martillo de carpintero', 'Martillo con mango de madera reforzado.', 8.50, 1),
('Destornillador plano', 'Destornillador de acero, punta plana.', 3.25, 1),
('Taladro eléctrico', 'Taladro con velocidad variable de 600W.', 65.99, 2),
('Amoladora angular', 'Amoladora de 750W con disco de 115mm.', 89.90, 2),
('Bolsa de cemento 50kg', 'Cemento Portland de alta resistencia.', 12.00, 3),
('Pintura blanca 4L', 'Pintura acrílica blanca mate.', 15.50, 4),
('Brocha de 3 pulgadas', 'Brocha para pintar paredes.', 2.75, 4),
('Clavos 2” caja 1kg', 'Caja de clavos de acero.', 4.80, 5),
('Tornillos para madera 50un', 'Tornillos zincados.', 6.20, 5),
('Llave inglesa ajustable', 'Llave ajustable de 200mm.', 9.99, 1);

-- Inventario
INSERT INTO inventario (id_producto, stock) VALUES
(1, 50),
(2, 100),
(3, 25),
(4, 10),
(5, 80),
(6, 40),
(7, 120),
(8, 200),
(9, 150),
(10, 60);

-- Alertas de stock
INSERT INTO alertas_stock (id_inventario, nivel_minimo, stock_actual) VALUES
(3, 30, 25),
(4, 15, 10);

-- Pedidos
INSERT INTO pedidos (id_cliente, estado_pedido, total_pedido) VALUES
(3, 'Pendiente', 85.50),
(4, 'Completado', 120.75),
(5, 'Cancelado', 30.00),
(3, 'Completado', 45.70);

-- Detalle de pedidos
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 2, 8.50),
(1, 2, 5, 3.25),
(2, 3, 1, 65.99),
(2, 6, 2, 15.50),
(2, 7, 5, 2.75),
(3, 8, 5, 4.80),
(4, 10, 2, 9.99),
(4, 9, 3, 6.20);

-- Métodos de pago
INSERT INTO metodos_pago (nombre_metodo) VALUES
('Efectivo'),
('Tarjeta de crédito'),
('Transferencia bancaria'),
('Pago móvil');

-- Pagos
INSERT INTO pagos (id_pedido, id_metodo, monto_pagado) VALUES
(2, 2, 120.75),
(4, 1, 45.70);

-- Búsquedas de clientes
INSERT INTO busquedas_clientes (id_cliente, termino_busqueda) VALUES
(3, 'taladro inalámbrico'),
(3, 'cemento portland'),
(4, 'pintura azul'),
(5, 'brocha 5 pulgadas'),
(3, 'clavos de acero'),
(5, 'llave inglesa'),
(4, 'destornillador estrella');
