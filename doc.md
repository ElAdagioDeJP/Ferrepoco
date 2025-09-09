Gemini

2.5 Flash





Crear
Manual de Usuario de la Plataforma Ferrepoco
Gestión Inteligente para tu Ferretería

Índice
Introducción

(#2-perfiles-de-usuario-y-roles-de-acceso)


3.1. 
3.2. 
3.3.(#33-reportes-y-análisis)


4.1. 
4.2. 


5.1.(#51-navegación-y-búsqueda-de-productos)
5.2. 
5.3.(#53-seguimiento-de-pedidos)

(#6-anexo-tecnico-referencia-a-los-diagramas)

1. Introducción
Ferrepoco es la plataforma digital diseñada para modernizar y optimizar la gestión de tu ferretería. Con esta herramienta, podrás llevar el control de tu negocio a un nuevo nivel de eficiencia y productividad.

La plataforma te permite:

Automatizar y gestionar tu inventario en tiempo real.

Agilizar los procesos de venta en el punto de cobro.

Fortalecer la relación y el seguimiento de tus clientes.

Generar reportes para la toma de decisiones estratégicas.

Público Objetivo:
Dueños, administradores, personal de ventas y encargados de almacén de ferreterías.

Requisitos del Sistema:

Precondiciones:

Tener acceso a una conexión a Internet estable.

Disponer de un computador o dispositivo compatible.

Contar con un usuario y contraseña de acceso asignados.

Postcondiciones:

Acceso al sistema de gestión de la ferretería.

Capacidad para gestionar inventario, ventas y clientes según tu rol.

Visualización de datos y reportes actualizados.

2. Perfiles de Usuario y Roles de Acceso
La plataforma Ferrepoco organiza sus funcionalidades en torno a tres perfiles de usuario, cada uno con responsabilidades y permisos específicos. Esta estructura de roles se basa en la arquitectura del sistema, tal como se define en el Diagrama de Clases, donde las clases Administrador, Empleado y Cliente heredan de una clase base Usuario. Al iniciarSesion(), la plataforma utiliza este polimorfismo por herencia para redireccionarte automáticamente a la vista correcta.

Administrador: El rol con el nivel más alto de control. Se encarga de la configuración general de la aplicación, la gestión de usuarios, el control total del inventario y el acceso a los reportes de rendimiento.

Empleado: Un rol operativo que se enfoca en las tareas diarias, como la actualización de inventario, la gestión de pedidos de los clientes y el soporte al usuario.

Cliente: El usuario final que interactúa con la plataforma para navegar por el catálogo de productos, realizar compras y hacer seguimiento de sus pedidos.

3. Guía para el Administrador
Como Administrador, tienes la capacidad de supervisar y gestionar todos los aspectos de la plataforma. La mayoría de tus tareas corresponden a los casos de uso principales definidos en el Diagrama de Casos de Uso, como Gestionar Usuarios y Gestionar Inventario.

3.1. Gestión de Usuarios
Esta funcionalidad te permite mantener el control sobre quién accede a la plataforma y qué permisos tiene.

Crear Usuarios: Para dar de alta a un nuevo Empleado o Administrador, ve a la sección "Gestión de Usuarios" y completa la información requerida (nombre, email, rol).

Modificar y Deshabilitar Usuarios: Puedes actualizar la información de cualquier usuario en la lista. Importante: La plataforma está diseñada para que los usuarios no puedan ser eliminados permanentemente. En su lugar, debes deshabilitar las cuentas que ya no estén activas. Esto preserva un registro de la actividad histórica, lo cual es crucial para la integridad de los datos.

Asignación de Roles: Al crear o modificar un usuario, puedes asignarle uno de los roles predefinidos (Administrador, Empleado, Cliente). Esta asignación determina sus permisos y la vista a la que accederá.

3.2. Gestión de Productos e Inventario
Aquí controlas el catálogo de productos y el nivel de stock en la ferretería.

Agregar Producto: Ve a la sección de inventario y utiliza la opción "Agregar Nuevo Producto". Debes proporcionar detalles como el nombre, la descripción, el precio y el stock inicial.

Modificar Producto: Puedes editar la información de cualquier producto existente. La plataforma utiliza un método como Producto.actualizarStock(), que puede ser invocado de varias maneras (polimorfismo por sobrecarga) para simplemente cambiar la cantidad o para registrar la cantidad y el motivo del cambio.

Eliminar Producto: Si un producto ya no se vende, puedes archivarlo o eliminarlo del catálogo para que no aparezca en la vista del cliente.

Alertas de Stock: El sistema genera automáticamente alertas visuales cuando el nivel de stock de un producto cae por debajo de un umbral predefinido. Esto se basa en la lógica del método Inventario.generarAlertas(), asegurando que nunca te quedes sin productos clave.

3.3. Reportes y Análisis
La sección de reportes te proporciona una visión clara del rendimiento de tu negocio.

Reporte de Ventas: Visualiza las ventas por periodo, por categoría de producto o por cliente.

Análisis de Clientes: Identifica las preferencias de compra de los clientes para tomar decisiones de marketing y stock más informadas.

Análisis de Inventario: Obtén un resumen del valor total de tu inventario y los productos con menor y mayor rotación.

4. Guía para el Empleado
Como Empleado, tus responsabilidades se centran en la ejecución de las operaciones diarias. Tu rol es fundamental para garantizar que los pedidos se procesen a tiempo y que el inventario se mantenga actualizado. Tus interacciones se corresponden con casos de uso como Procesar Pedido y Actualizar Inventario en el Diagrama de Casos de Uso.

4.1. Gestión del Inventario
Actualizar Stock: Puedes ajustar el stock de los productos. Por ejemplo, al recibir una nueva mercancía, puedes usar el método actualizarStock() para incrementar la cantidad de un producto. El sistema registrará el cambio para mantener la trazabilidad.

Consultar Inventario: Puedes buscar productos específicos y verificar su disponibilidad para responder a las consultas de los clientes.

4.2. Gestión de Pedidos
Revisar Nuevos Pedidos: La sección "Pedidos" muestra una lista de los pedidos pendientes de los clientes.

Procesar Pedido: Al seleccionar un pedido, puedes cambiar su estado (ej. "En preparación", "Enviado", "Entregado"). Esto actualiza el estado del pedido en la vista del cliente.

Historial de Pedidos: Puedes acceder a los pedidos completados para referencias futuras o para resolver consultas de los clientes.

5. Guía para el Cliente
Como Cliente, tienes acceso a la parte de la plataforma diseñada para una experiencia de compra fluida y conveniente. Tus interacciones giran en torno al caso de uso Realizar Compra del Diagrama de Casos de Uso.

5.1. Navegación y Búsqueda de Productos
Navegar por el Catálogo: Explora las diferentes categorías de productos. La plataforma te mostrará los productos disponibles con imágenes y descripciones.

Buscar Producto: Utiliza la barra de búsqueda para encontrar productos específicos. Gracias al polimorfismo por sobrecarga en el método Cliente.buscarProducto(), puedes buscar por nombre, categoría o incluso por un rango de precios.

5.2. Carrito de Compras y Proceso de Pago
Agregar al Carrito: Haz clic en "Agregar al Carrito" para añadir un producto. Puedes ajustar la cantidad en cualquier momento.

Proceso de Pago: Cuando estés listo, ve a tu carrito y haz clic en "Comprar". La plataforma te guiará a través de un proceso de pago simulado para finalizar la creación del Pedido.

5.3. Seguimiento de Pedidos
Mis Pedidos: En la sección "Mis Pedidos", puedes ver el historial de tus compras y el estado actual de cada Pedido (ej. "Enviado", "Entregado").

6. Anexo Técnico: Referencia a los Diagramas
Para aquellos interesados en la arquitectura subyacente, la funcionalidad de la plataforma está directamente relacionada con los diagramas de diseño.

Diagrama de Clases: Este diagrama muestra que las clases Administrador, Empleado y Cliente son especializaciones de la clase base Usuario. Esto significa que comparten características comunes (como nombre de usuario y contraseña) pero tienen comportamientos únicos. Por ejemplo, el método iniciarSesion() se comporta de manera distinta para cada uno, un claro ejemplo de polimorfismo por sobreescritura. La clase Plataforma Ferrepoco se compone de otras clases como Inventario, que a su vez contiene una colección de productos.

Diagrama de Casos de Uso: Este diagrama ilustra las interacciones de los usuarios con el sistema. Un Administrador puede realizar el caso de uso Generar Reportes, mientras que un Empleado puede ejecutar Procesar Pedido, y ambos tienen acceso a funcionalidades que implementan la interfaz IGestionable, demostrando polimorfismo por interfaz.

