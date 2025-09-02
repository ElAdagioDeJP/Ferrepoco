-- ==============================
-- Inserción masiva actualizada
-- ==============================
-- Crea la base de datos si no existe y la usa
CREATE DATABASE IF NOT EXISTS ferrepoco_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ferrepoco_db;

-- Desactivar comprobación de FK temporalmente por si se ejecuta sobre datos previos
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- -----------------------------
-- Roles (idempotente por nombre_rol único)
-- -----------------------------
INSERT INTO roles (nombre_rol) VALUES
('Administrador'),
('Empleado'),
('Cliente')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

-- -----------------------------
-- Usuarios (incluye imagen_url) -- (correo_electronico es UNIQUE)
-- -----------------------------
-- Usamos el mismo hash de contraseña que tenías en el INSERT viejo
INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasena, imagen_url, id_rol)
VALUES
('Juan',  'Pérez',  'juan.perez@ferrepoco.com',  '$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2014/04/24/16/14/san-juan-331482_1280.jpg', 1),
('María', 'López',  'maria.lopez@ferrepoco.com', '$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2020/08/16/19/53/mary-5493681_1280.jpg', 2),
('Carlos','Ramírez','carlos.ramirez@gmail.com',  '$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2018/07/06/19/48/charles-chaplin-3521070_1280.jpg', 3),
('Ana',   'Martínez','ana.martinez@gmail.com',   '$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2022/12/22/14/19/woman-7672264_1280.jpg', 3),
('Luis',  'Fernández','luis.fernandez@gmail.com','$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2016/04/07/11/03/louis-15-1313617_1280.jpg', 3),
('Sofía', 'Gómez',  'sofia.gomez@gmail.com',   '$2a$10$FXey/aRLex62ob.w4KZkCONEnbsfMiAdNpJWHVbc7O.MsIM0uCnDG', 'https://cdn.pixabay.com/photo/2020/05/11/19/26/cat-5159844_1280.jpg', 2)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    apellido = VALUES(apellido),
    contrasena = VALUES(contrasena),
    imagen_url = VALUES(imagen_url),
    id_rol = VALUES(id_rol);

-- -----------------------------
-- Categorías (idempotente por nombre_categoria único)
-- -----------------------------
INSERT INTO categorias (nombre_categoria) VALUES
('Herramientas manuales'),
('Herramientas eléctricas'),
('Materiales de construcción'),
('Pinturas'),
('Ferretería general')
ON DUPLICATE KEY UPDATE nombre_categoria = VALUES(nombre_categoria);

-- -----------------------------
-- Productos (se asume orden 1..10)
-- -----------------------------
-- NOTA: si ya existen productos con esos nombres y quieres evitar duplicados, podríamos usar un unique sobre nombre_producto; aquí insertamos directamente.
INSERT INTO productos (nombre_producto, descripcion, precio, id_categoria) VALUES
('Martillo de carpintero', 'Martillo con mango de madera reforzado.', 8.50, 1),
('Destornillador plano',  'Destornillador de acero, punta plana.', 3.25, 1),
('Taladro eléctrico',     'Taladro con velocidad variable de 600W.', 65.99, 2),
('Amoladora angular',     'Amoladora de 750W con disco de 115mm.', 89.90, 2),
('Bolsa de cemento 50kg', 'Cemento Portland de alta resistencia.', 12.00, 3),
('Pintura blanca 4L',     'Pintura acrílica blanca mate.', 15.50, 4),
('Brocha de 3 pulgadas',  'Brocha para pintar paredes.', 2.75, 4),
('Clavos 2” caja 1kg',   'Caja de clavos de acero.', 4.80, 5),
('Tornillos para madera 50un','Tornillos zincados.', 6.20, 5),
('Llave inglesa ajustable','Llave ajustable de 200mm.', 9.99, 1);

-- -----------------------------
-- Imágenes por producto (posición 1 para cada producto)
-- -----------------------------
-- Se usa ON DUPLICATE para actualizar si ya existe la posición 1 para ese producto
INSERT INTO imagenes_producto (id_producto, url_imagen, posicion) VALUES
 (1, 'https://cdn.pixabay.com/photo/2016/11/29/10/15/hammer-1868956_1280.jpg', 1),
 (2, 'https://cdn.pixabay.com/photo/2017/02/05/00/48/screwdriver-2038885_1280.jpg', 1),
 (3, 'https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=1024x1024&w=is&k=20&c=u1cqmCGyJAB_-M551lhw5GvJePB4vJw-pVqDZbHacQg=', 1),
 (4, 'https://cdn.pixabay.com/photo/2020/11/12/16/58/worker-5736096_1280.jpg', 1),
 (5, 'https://media.istockphoto.com/id/805215872/photo/cement-bag-on-white-background-3d-rendering-image.jpg?s=1024x1024&w=is&k=20&c=699UdnLl28Ki5FBnN7md1qgBjg4MCwtHtaI0FCAsxiI=', 1),
 (6, 'https://cdn.pixabay.com/photo/2019/05/09/15/45/paint-4191398_1280.jpg', 1),
 (7, 'https://cdn.pixabay.com/photo/2025/02/26/13/42/painting-9433099_1280.jpg', 1),
 (8, 'https://cdn.pixabay.com/photo/2019/11/06/21/34/nails-4607202_1280.jpg', 1),
 (9, 'https://cdn.pixabay.com/photo/2014/11/17/17/26/screw-534910_1280.jpg', 1),
 (10,'https://cdn.pixabay.com/photo/2015/10/12/21/21/wrench-985192_1280.jpg', 1)
ON DUPLICATE KEY UPDATE
    url_imagen = VALUES(url_imagen),
    fecha_creacion = CURRENT_TIMESTAMP;

-- -----------------------------
-- Inventario (id_producto único en la tabla inventario)
-- -----------------------------
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
(10, 60)
ON DUPLICATE KEY UPDATE
    stock = VALUES(stock),
    fecha_ultima_actualizacion = CURRENT_TIMESTAMP;

-- -----------------------------
-- Alertas de stock (registros existentes)
-- -----------------------------
INSERT INTO alertas_stock (id_inventario, nivel_minimo, stock_actual) VALUES
-- id_inventario 3 (taladro), 4 (amoladora) conforme a los inserts de inventario anteriores
( (SELECT id_inventario FROM inventario WHERE id_producto = 3 LIMIT 1), 30, 25),
( (SELECT id_inventario FROM inventario WHERE id_producto = 4 LIMIT 1), 15, 10 );

-- -----------------------------
-- Pedidos
-- -----------------------------
INSERT INTO pedidos (id_cliente, estado_pedido, total_pedido) VALUES
(3, 'Pendiente', 85.50),
(4, 'Completado', 120.75),
(5, 'Cancelado', 30.00),
(3, 'Completado', 45.70);

-- -----------------------------
-- Detalle de pedidos
-- -----------------------------
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 2, 8.50),
(1, 2, 5, 3.25),
(2, 3, 1, 65.99),
(2, 6, 2, 15.50),
(2, 7, 5, 2.75),
(3, 8, 5, 4.80),
(4, 10, 2, 9.99),
(4, 9, 3, 6.20);

-- -----------------------------
-- Métodos de pago (idempotente por nombre_metodo único)
-- -----------------------------
INSERT INTO metodos_pago (nombre_metodo) VALUES
('Efectivo'),
('Tarjeta de crédito'),
('Transferencia bancaria'),
('Pago móvil')
ON DUPLICATE KEY UPDATE nombre_metodo = VALUES(nombre_metodo);

-- -----------------------------
-- Pagos
-- -----------------------------
INSERT INTO pagos (id_pedido, id_metodo, monto_pagado) VALUES
(2, 2, 120.75),
(4, 1, 45.70)
ON DUPLICATE KEY UPDATE
    id_metodo = VALUES(id_metodo),
    monto_pagado = VALUES(monto_pagado),
    fecha_pago = CURRENT_TIMESTAMP;

-- -----------------------------
-- Búsquedas de clientes
-- -----------------------------
INSERT INTO busquedas_clientes (id_cliente, termino_busqueda) VALUES
(3, 'taladro inalámbrico'),
(3, 'cemento portland'),
(4, 'pintura azul'),
(5, 'brocha 5 pulgadas'),
(3, 'clavos de acero'),
(5, 'llave inglesa'),
(4, 'destornillador estrella');

COMMIT;

-- Reactivar comprobaciones de FK
SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------
-- Comprobaciones rápidas (opcional)
-- -----------------------------
/*
SELECT u.id_usuario, u.nombre, u.apellido, u.correo_electronico, u.imagen_url
FROM usuarios u
ORDER BY u.id_usuario;

SELECT p.id_producto, p.nombre_producto, ip.posicion, ip.url_imagen
FROM productos p
LEFT JOIN imagenes_producto ip ON p.id_producto = ip.id_producto
ORDER BY p.id_producto, ip.posicion;
*/
