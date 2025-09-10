const express = require('express');
const router = express.Router();

// Importa tus modelos o utilidades para consultar la base de datos
const db = require('../src/db');

// Gemini API para fallback
const axios = require('axios');
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_API_KEY = 'AIzaSyCn8U7_K2llRmrTzPK9B-ttbyKkl_PTJLo';

// Analizador simple de preguntas (puedes mejorar esto luego)
async function responderDesdeDB(pregunta) {
    const lower = pregunta.toLowerCase();
    // Saludos y despedidas
    const saludos = [
        'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'buen día', 'buenas', 'holi', 'holis', 'holaa', 'holaaa', 'qué tal', 'que tal', 'saludo', 'saludito', 'saluditos', 'hello', 'hi', 'hey'
    ];
    const despedidas = [
        'adios', 'adiós', 'hasta luego', 'nos vemos', 'chao', 'chau', 'bye', 'hasta pronto', 'hasta la próxima', 'me despido', 'gracias, adios', 'gracias, adiós', 'gracias, hasta luego', 'gracias, nos vemos', 'gracias, chau', 'gracias, chao', 'gracias, bye'
    ];
    if (saludos.some(s => lower.includes(s))) {
        return '¡Hola! ¿En qué puedo ayudarte hoy? 😊';
    }
    if (despedidas.some(d => lower.includes(d))) {
        return '¡Hasta luego! Si necesitas algo más, aquí estaré. 👋';
    }
    // Stock de todos los productos
    if (lower.match(/cu[aá]nt[ao]s? productos|stock total|inventario total|cu[aá]nto stock/i)) {
        const rows = await db.query(`
            SELECT p.nombre_producto, i.stock
            FROM productos p
            LEFT JOIN inventario i ON i.id_producto = p.id_producto
        `);
        if (!rows.length) return 'No hay productos registrados.';
        let respuesta = 'Stock actual de productos:\n';
        respuesta += rows.map(r => `- ${r.nombre_producto}: ${r.stock ?? 0}`).join('\n');
        return respuesta;
    }
    // Stock de un producto específico (búsqueda flexible y mejorada)
    if (lower.includes('stock') || lower.includes('hay') || lower.includes('cuantos') || lower.includes('cuántos')) {
        // Extraer palabras clave relevantes (ignorando palabras comunes)
        const stopwords = ['de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'hay', 'stock', 'tengo', 'en', 'cuanto', 'cuánta', 'cuánta', 'cuántos', 'cuántas', 'cuantos', 'cuantas', 'actualmente', 'disponible', 'disponibles', 'existe', 'existen', 'queda', 'quedan', 'hay', 'producto', 'productos', 'herramienta', 'herramientas', 'ferreteria', 'ferretería', 'cantidad', 'total'];
        let palabras = lower.split(/\s+/).filter(w => w.length > 2 && !stopwords.includes(w));
        if (palabras.length) {
            // Buscar productos que contengan todas las palabras clave
            const likeQuery = palabras.map(() => 'LOWER(p.nombre_producto) LIKE ?').join(' AND ');
            const likeParams = palabras.map(w => `%${w}%`);
            let rows = await db.query(`
                SELECT p.nombre_producto, i.stock
                FROM productos p
                LEFT JOIN inventario i ON i.id_producto = p.id_producto
                WHERE ${likeQuery}
                LIMIT 5
            `, likeParams);
            if (!rows.length && palabras.length > 1) {
                // Si no hay coincidencias con todas las palabras, busca por cada palabra individual
                for (const w of palabras) {
                    rows = await db.query(`
                        SELECT p.nombre_producto, i.stock
                        FROM productos p
                        LEFT JOIN inventario i ON i.id_producto = p.id_producto
                        WHERE LOWER(p.nombre_producto) LIKE ?
                        LIMIT 2
                    `, [`%${w}%`]);
                    if (rows.length) break;
                }
            }
            if (rows.length) {
                if (rows.length === 1) {
                    return `Stock de ${rows[0].nombre_producto}: ${rows[0].stock ?? 0}`;
                } else {
                    return rows.map(r => `Stock de ${r.nombre_producto}: ${r.stock ?? 0}`).join('\n');
                }
            }
        }
    }
    // Pregunta por ubicación
    if (lower.includes('dónde están ubicados') || lower.includes('ubicación') || lower.includes('donde estan ubicados') || lower.includes('direccion')) {
        return 'Estamos ubicados en la universidad Jose Antonio Paez';
    }
    // Cuántos productos
    if (lower.includes('cuántos productos') || lower.includes('cantidad de productos')) {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM productos');
        return `Actualmente hay ${rows[0].total} productos en la tienda.`;
    }
    // Si la pregunta no es del negocio, responder personalizado
    const temasNegocio = [
        // Palabras de productos y stock
        'stock', 'producto', 'productos', 'herramienta', 'herramientas', 'ferreteria', 'ferretería', 'cantidad', 'total', 'inventario', 'catalogo', 'catálogo', 'precio', 'precios', 'oferta', 'ofertas', 'disponible', 'disponibles', 'existencia', 'existencias', 'quedan', 'queda', 'hay', 'tienen', 'tiene', 'venden', 'vender', 'compra', 'comprar', 'venta', 'pedido', 'pedidos', 'carrito', 'orden', 'ordenes', 'órdenes', 'devolucion', 'devolución', 'devoluciones',
        // Palabras de materiales y construcción
        'cemento', 'arena', 'grava', 'bloque', 'bloques', 'ladrillo', 'ladrillos', 'varilla', 'varillas', 'pintura', 'pinturas', 'yeso', 'concreto', 'mezcla', 'material', 'materiales', 'construcción', 'construccion', 'obra', 'obras', 'pared', 'paredes', 'techo', 'techos', 'piso', 'pisos', 'columna', 'columnas', 'viga', 'vigas', 'estructura', 'estructuras', 'albañil', 'albañilería', 'albanil', 'albanileria',
        // Palabras de herramientas y usos
        'destornillador', 'destornilladores', 'martillo', 'martillos', 'taladro', 'taladros', 'llave', 'llaves', 'alicate', 'alicates', 'pinza', 'pinzas', 'sierra', 'sierras', 'cinta', 'cintas', 'metro', 'metros', 'regla', 'reglas', 'escuadra', 'escuadras', 'nivel', 'niveles', 'multímetro', 'multimetro', 'tester', 'probador', 'buscapolos', 'tornillo', 'tornillos', 'clavo', 'clavos', 'tuerca', 'tuercas', 'broca', 'brocas', 'pico', 'palas', 'pala', 'cuchara', 'cucharas', 'llana', 'llanas', 'cincel', 'cinceles', 'serrucho', 'serruchos', 'escuadra', 'escuadras', 'compás', 'compas', 'calibre', 'calibres', 'flexómetro', 'flexometro', 'nivel', 'niveles', 'escuadra', 'escuadras',
        // Palabras de uso y recomendación
        'usar', 'uso', 'utilizar', 'necesito', 'recomienda', 'recomiéndame', 'recomiendas', 'sirve', 'sirven', 'para', 'desarmar', 'armar', 'abrir', 'cerrar', 'medir', 'cortar', 'perforar', 'atornillar', 'aflojar', 'apretar', 'sujetar', 'colgar', 'instalar', 'quitar', 'poner', 'montar', 'desmontar', 'reparar', 'arreglar', 'fix', 'fixear', 'solucionar', 'soluciona', 'solucionas', 'mejor', 'mejores', 'adecuado', 'adecuada', 'adecuados', 'adecuadas', 'correcto', 'correcta', 'correctos', 'correctas', 'ideal', 'ideales', 'recomendado', 'recomendada', 'recomendados', 'recomendadas',
        // Palabras de electrodomésticos y tecnología
        'telefono', 'teléfono', 'celular', 'movil', 'móvil', 'electrodoméstico', 'electrodomestico', 'electrodomésticos', 'electrodomesticos', 'computadora', 'computadoras', 'ordenador', 'ordenadores', 'laptop', 'laptops', 'pc', 'pcs', 'tablet', 'tablets', 'pantalla', 'pantallas', 'tv', 'televisor', 'televisores', 'monitor', 'monitores',
        // Palabras de ubicación y empresa
        'ubicacion', 'ubicación', 'donde', 'direccion', 'dirección', 'empresa', 'compañía', 'compania', 'negocio', 'ferrepoco', 'pocobot',
        // Palabras de soporte y atención
        'soporte', 'ayuda', 'asistencia', 'manual', 'usuario', 'manual de usuario', 'usuarios', 'empleado', 'empleados', 'admin', 'administrador', 'administradora', 'administradores', 'sucursal', 'sucursales',
        // Palabras de pago y facturación
        'factura', 'facturación', 'facturacion', 'pago', 'pagos', 'metodo', 'método', 'metodos', 'métodos', 'envio', 'envío', 'envios', 'envíos', 'entrega', 'entregas', 'proveedor', 'proveedores', 'cliente', 'clientes'
    ];
    if (!temasNegocio.some(t => lower.includes(t))) {
        return 'Lo siento, estoy entrenada solamente para contestar preguntas sobre FERREPOCO C,A';
    }
    return null; // No se pudo responder desde la base de datos
}

async function responderConGemini(pregunta) {
    try {
        const res = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: 'user', parts: [{ text: pregunta }] }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return (
            res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'No se pudo obtener respuesta de Gemini.'
        );
    } catch (e) {
        return 'Error al conectar con Gemini.';
    }
}

router.post('/', async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Pregunta requerida' });
    let respuesta = await responderDesdeDB(question);
    if (!respuesta) {
        respuesta = await responderConGemini(question);
    }
    res.json({ answer: respuesta });
});

module.exports = router;
