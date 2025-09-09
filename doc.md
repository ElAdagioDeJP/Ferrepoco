# Manual de Usuario de la Plataforma Ferrepoco  
**Gestión Inteligente para tu Ferretería**

---

## Índice  
- [Introducción](#1-introducción)  
- [Perfiles de Usuario y Roles de Acceso](#2-perfiles-de-usuario-y-roles-de-acceso)  
- [Guía para el Administrador](#3-guía-para-el-administrador)  
  - [Gestión de Usuarios](#31-gestión-de-usuarios)  
  - [Gestión de Productos e Inventario](#32-gestión-de-productos-e-inventario)  
  - [Reportes y Análisis](#33-reportes-y-análisis)  
- [Guía para el Empleado](#4-guía-para-el-empleado)  
  - [Gestión del Inventario](#41-gestión-del-inventario)  
  - [Gestión de Pedidos](#42-gestión-de-pedidos)  
- [Guía para el Cliente](#5-guía-para-el-cliente)  
  - [Navegación y Búsqueda de Productos](#51-navegación-y-búsqueda-de-productos)  
  - [Carrito de Compras y Proceso de Pago](#52-carrito-de-compras-y-proceso-de-pago)  
  - [Seguimiento de Pedidos](#53-seguimiento-de-pedidos)  
- [Anexo Técnico: Referencia a los Diagramas](#6-anexo-técnico-referencia-a-los-diagramas)  

---

## 1. Introducción  
**Ferrepoco** es la plataforma digital diseñada para modernizar y optimizar la gestión de tu ferretería.  
Con esta herramienta, podrás llevar el control de tu negocio a un nuevo nivel de eficiencia y productividad.

La plataforma te permite:  
- Automatizar y gestionar tu inventario en tiempo real.  
- Agilizar los procesos de venta en el punto de cobro.  
- Fortalecer la relación y el seguimiento de tus clientes.  
- Generar reportes para la toma de decisiones estratégicas.  

**Público Objetivo:**  
Dueños, administradores, personal de ventas y encargados de almacén de ferreterías.  

**Requisitos del Sistema:**  

**Precondiciones:**  
- Tener acceso a una conexión a Internet estable.  
- Disponer de un computador o dispositivo compatible.  
- Contar con un usuario y contraseña de acceso asignados.  

**Postcondiciones:**  
- Acceso al sistema de gestión de la ferretería.  
- Capacidad para gestionar inventario, ventas y clientes según tu rol.  
- Visualización de datos y reportes actualizados.  

---

## 2. Perfiles de Usuario y Roles de Acceso  
La plataforma **Ferrepoco** organiza sus funcionalidades en torno a tres perfiles de usuario, cada uno con responsabilidades y permisos específicos.  

Esta estructura de roles se basa en la arquitectura del sistema, tal como se define en el **Diagrama de Clases**, donde las clases **Administrador, Empleado y Cliente** heredan de una clase base `Usuario`.  

Al ejecutar `iniciarSesion()`, la plataforma utiliza **polimorfismo por herencia** para redireccionarte automáticamente a la vista correcta.  

- **Administrador:**  
  El rol con el nivel más alto de control. Configuración general, gestión de usuarios, control total del inventario y acceso a reportes de rendimiento.  

- **Empleado:**  
  Rol operativo enfocado en la actualización de inventario, gestión de pedidos de clientes y soporte.  

- **Cliente:**  
  Usuario final que navega por el catálogo de productos, realiza compras y da seguimiento a sus pedidos.  

---

## 3. Guía para el Administrador  
Como Administrador, puedes supervisar y gestionar todos los aspectos de la plataforma.  
Tus tareas corresponden a los casos de uso principales del **Diagrama de Casos de Uso**, como **Gestionar Usuarios** y **Gestionar Inventario**.  

### 3.1. Gestión de Usuarios  
- **Crear Usuarios:**  
  Ve a *Gestión de Usuarios* y completa los datos (nombre, email, rol).  

- **Modificar y Deshabilitar Usuarios:**  
  No se eliminan permanentemente; se deshabilitan para preservar la trazabilidad de los datos.  

- **Asignación de Roles:**  
  Selecciona entre Administrador, Empleado o Cliente para definir permisos y vistas.  

### 3.2. Gestión de Productos e Inventario  
- **Agregar Producto:**  
  Desde *Inventario*, opción *Agregar Nuevo Producto*. Requiere nombre, descripción, precio y stock inicial.  

- **Modificar Producto:**  
  Edita información existente.  
  El método `Producto.actualizarStock()` admite **polimorfismo por sobrecarga**, ya sea cambiando solo la cantidad o registrando cantidad y motivo.  

- **Eliminar Producto:**  
  Puede archivarse o eliminarse del catálogo.  

- **Alertas de Stock:**  
  El método `Inventario.generarAlertas()` notifica cuando el stock cae por debajo de un umbral.  

### 3.3. Reportes y Análisis  
- **Reporte de Ventas:** Ventas por periodo, categoría o cliente.  
- **Análisis de Clientes:** Preferencias de compra para decisiones de marketing y stock.  
- **Análisis de Inventario:** Valor total y rotación de productos.  

---

## 4. Guía para el Empleado  
El Empleado ejecuta las operaciones diarias. Sus interacciones corresponden a los casos de uso **Procesar Pedido** y **Actualizar Inventario**.  

### 4.1. Gestión del Inventario  
- **Actualizar Stock:** Registra nuevas mercancías con `actualizarStock()`.  
- **Consultar Inventario:** Verifica disponibilidad de productos.  

### 4.2. Gestión de Pedidos  
- **Revisar Nuevos Pedidos:** Listado de pedidos pendientes.  
- **Procesar Pedido:** Cambia estado del pedido (*En preparación, Enviado, Entregado*).  
- **Historial de Pedidos:** Consulta pedidos completados.  

---

## 5. Guía para el Cliente  
El Cliente utiliza la plataforma principalmente para realizar compras (**caso de uso: Realizar Compra**).  

### 5.1. Navegación y Búsqueda de Productos  
- **Navegar por el Catálogo:** Visualiza productos por categoría con imágenes y descripciones.  
- **Buscar Producto:** Con `Cliente.buscarProducto()` (**polimorfismo por sobrecarga**), busca por nombre, categoría o rango de precios.  

### 5.2. Carrito de Compras y Proceso de Pago  
- **Agregar al Carrito:** Añade productos y ajusta cantidades.  
- **Proceso de Pago:** Compra simulada para generar el pedido.  

### 5.3. Seguimiento de Pedidos  
- **Mis Pedidos:** Historial y estado de cada compra (*Enviado, Entregado*).  

---

## 6. Anexo Técnico: Referencia a los Diagramas  

### Diagrama de Clases  
- **Administrador, Empleado y Cliente** heredan de `Usuario`.  
- Comparten atributos comunes, pero redefinen comportamientos (`iniciarSesion()` con **polimorfismo por sobreescritura**).  
- La clase `PlataformaFerrepoco` contiene `Inventario`, que a su vez gestiona productos.  

### Diagrama de Casos de Uso  
- **Administrador:** Generar Reportes.  
- **Empleado:** Procesar Pedido.  
- Ambos pueden ejecutar funcionalidades que implementan la interfaz `IGestionable` (**polimorfismo por interfaz**).  

---
