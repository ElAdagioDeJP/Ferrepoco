const express = require('express');
const router = express.Router();

// Importa tus modelos o utilidades para consultar la base de datos
const db = require('../src/db');

// Gemini API para fallback
const axios = require('axios');
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

// Analizador simple de preguntas (puedes mejorar esto luego)
async function responderDesdeDB(pregunta) {
    const lower = pregunta.toLowerCase();
    // Horarios de atención
    if (lower.includes('horario') || lower.includes('horarios') || lower.includes('a qué hora abren') || lower.includes('a qué hora cierran') || lower.includes('a que hora abren') || lower.includes('a que hora cierran')) {
        return 'Nuestros horarios son de 8 am a 6 pm';
    }
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
    // Respuesta personalizada para "¿Qué es Ferrepoco?"
    if (lower.includes('qué es ferrepoco') || lower.includes('que es ferrepoco')) {
        return 'Ferrepoco es una ferretería ubicada en San Diego, estado Carabobo. Los dueños son Jose Guerrero, Regina Escalona y Angel De Crescenzo.';
    }
    // Redirigir a preguntas frecuentes
    if (lower.includes('pregunta frecuente') || lower.includes('faq') || lower.includes('preguntas frecuentes')) {
        return 'Puedes consultar el apartado de Preguntas Frecuentes en el menú principal para ver información útil sobre Ferrepoco.';
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
    // Stock de un producto específico (búsqueda flexible y mejorada, soporta plurales)
    if (lower.includes('stock') || lower.includes('hay') || lower.includes('cuantos') || lower.includes('cuántos')) {
        // Extraer palabras clave relevantes (ignorando palabras comunes)
        const stopwords = ['de', 'del', 'la', 'el', 'los', 'las', 'un', 'una', 'hay', 'stock', 'tengo', 'en', 'cuanto', 'cuánta', 'cuánta', 'cuántos', 'cuántas', 'cuantos', 'cuantas', 'actualmente', 'disponible', 'disponibles', 'existe', 'existen', 'queda', 'quedan', 'hay', 'producto', 'productos', 'herramienta', 'herramientas', 'ferreteria', 'ferretería', 'cantidad', 'total'];
        let palabras = lower.split(/\s+/).filter(w => w.length > 2 && !stopwords.includes(w));
        // Normalizar plurales (ej: martillos -> martillo)
        palabras = palabras.map(w => w.endsWith('es') ? w.slice(0, -2) : (w.endsWith('s') ? w.slice(0, -1) : w));
        if (palabras.length) {
            // Lista grande de herramientas venezolanas
            const herramientasVZLA = [
                // Herramientas manuales y eléctricas
                'martillo', 'martillo de goma', 'martillo de bola', 'martillo demoledor', 'mazo', 'destornillador', 'destornillador plano', 'destornillador estrella', 'destornillador de precisión', 'alicate', 'alicate de corte', 'alicate de presión', 'alicate universal', 'llave inglesa', 'llave fija', 'llave de tubo', 'llave ajustable', 'llave stilson', 'llave allen', 'llave hexagonal', 'llave de cruz', 'llave de rueda', 'sierra', 'sierra manual', 'sierra caladora', 'sierra circular', 'serrucho', 'serrucho de costilla', 'serrucho de punta', 'cinta métrica', 'flexómetro', 'nivel', 'nivel láser', 'escuadra', 'regla', 'compás', 'calibre', 'micrómetro', 'pinza', 'tenaza', 'cuchilla', 'cutter', 'pico', 'pala', 'pala cuadrada', 'pala punta', 'cuchara de albañil', 'llana', 'cincel', 'puntero', 'brocha', 'rodillo', 'taladro', 'taladro percutor', 'mecha', 'broca', 'broca para concreto', 'broca para metal', 'broca para madera', 'tornillo', 'clavo', 'tuerca', 'arandela', 'pistola de silicón', 'silicón', 'pistola de calor', 'espatula', 'espatula dentada', 'pistola de pintura', 'pistola de aire', 'compresor', 'andamio', 'carretilla', 'escalera', 'machete', 'hacha', 'motosierra', 'guantes', 'mascarilla', 'gafas de seguridad', 'casco', 'botas de seguridad', 'disco de corte', 'disco de desbaste', 'pulidora', 'amoladora', 'multímetro', 'tester', 'probador', 'buscapolos', 'soplete', 'soldador', 'estaño', 'cautín', 'alambre', 'cable', 'tubo pvc', 'tubo galvanizado', 'tubo cobre', 'gato hidráulico', 'gato mecánico', 'paleta', 'mezcladora', 'plomada', 'cuerda', 'soga', 'tijera', 'tijera de podar', 'manguera', 'regadera', 'aspersor', 'bomba de agua', 'bomba sumergible', 'foco', 'bombillo', 'linterna', 'reflector', 'tomacorriente', 'interruptor', 'breaker', 'tablero eléctrico', 'fusible', 'transformador', 'relé', 'contacto', 'enchufe', 'extensión', 'adaptador', 'cinta aislante', 'cinta teflón', 'cinta doble faz', 'cinta masking', 'cinta de embalar', 'cinta canela', 'cinta de señalización', 'cinta reflectiva', 'cinta antideslizante', 'cinta de aluminio', 'cinta de cobre', 'cinta vulcanizante', 'cinta de velcro', 'cinta de amarre',
                // Materiales de construcción
                'cemento', 'arena', 'grava', 'piedra', 'bloque', 'bloques', 'ladrillo', 'ladrillos', 'varilla', 'varillas', 'pintura', 'pinturas', 'yeso', 'concreto', 'mezcla', 'cal', 'cal viva', 'cal hidratada', 'mortero', 'estuco', 'adhesivo', 'pega', 'impermeabilizante', 'asfalto', 'teja', 'tejas', 'manto asfáltico', 'malla', 'malla electrosoldada', 'alambre de púas', 'alambre recocido', 'clavos para concreto', 'clavos para madera', 'tornillos para drywall', 'tornillos para madera', 'tornillos para metal', 'tornillos autorroscantes', 'tornillos de expansión', 'taco plástico', 'taco metálico', 'taco químico',
                // Plomería
                'tubería pvc', 'tubería cpvc', 'tubería galvanizada', 'tubería cobre', 'tubería polietileno', 'codo pvc', 'codo cpvc', 'codo galvanizado', 'codo cobre', 'tee pvc', 'tee cpvc', 'tee galvanizado', 'tee cobre', 'unión pvc', 'unión cpvc', 'unión galvanizada', 'unión cobre', 'llave de paso', 'llave de bola', 'llave de compuerta', 'llave de lavamanos', 'llave de fregadero', 'llave de ducha', 'llave de jardín', 'grifo', 'filtro de agua', 'manguera de ducha', 'regadera de ducha', 'sifón', 'trampa', 'válvula check', 'válvula de alivio', 'válvula de retención', 'válvula de presión', 'válvula de flotador',
                // Electricidad
                'cable eléctrico', 'cable de cobre', 'cable de aluminio', 'cable unipolar', 'cable multipolar', 'cable flexible', 'cable rígido', 'canaleta', 'tubería conduit', 'tubería flexible', 'tubería metálica', 'breaker', 'interruptor termomagnético', 'interruptor diferencial', 'tomacorriente doble', 'tomacorriente triple', 'toma industrial', 'toma de fuerza', 'tablero de distribución', 'tablero general', 'tablero seccional', 'fusible tipo cuchilla', 'fusible tipo cartucho', 'fusible tipo tapón', 'transformador de corriente', 'transformador de voltaje', 'relé térmico', 'relé electromagnético', 'contacto magnético', 'contacto seco', 'enchufe industrial', 'enchufe doméstico', 'extensión eléctrica', 'adaptador múltiple', 'lámpara led', 'lámpara fluorescente', 'lámpara incandescente', 'reflector led', 'reflector halógeno', 'reflector solar',
                // Pintura y acabados
                'pintura vinilica', 'pintura epóxica', 'pintura esmalte', 'pintura anticorrosiva', 'pintura impermeabilizante', 'pintura para piscina', 'pintura para tráfico', 'pintura para madera', 'pintura para metal', 'pintura para pared', 'pintura para techo', 'pintura para piso', 'pintura para fachada', 'pintura para baño', 'pintura para cocina', 'pintura para exterior', 'pintura para interior', 'barniz', 'sellador', 'masilla', 'enduido', 'lija', 'rodillo de lana', 'rodillo de espuma', 'brocha angular', 'brocha plana', 'cinta de enmascarar',
                // Ferretería agrícola y jardinería
                'machete cañero', 'machete jardinero', 'pala jardinera', 'rastrillo', 'azada', 'azadón', 'pico de jardinero', 'tijera de podar', 'tijera de jardín', 'manguera agrícola', 'aspersor agrícola', 'bomba de fumigar', 'bomba manual', 'bomba de mochila', 'regadera metálica', 'regadera plástica', 'carretilla agrícola', 'guadaña', 'desmalezadora', 'motoguadaña', 'corta césped', 'corta setos', 'corta ramas', 'serrucho de poda', 'serrucho telescópico', 'tijera cortasetos', 'tijera cortarramas', 'tijera de injertar', 'tijera de vendimia', 'tijera de uva',
                // Otros materiales y herramientas comunes
                'pegamento', 'silicona', 'resina', 'espuma expansiva', 'sellador acrílico', 'sellador de poliuretano', 'sellador de silicona', 'poliuretano', 'poliestireno', 'fibra de vidrio', 'lana de vidrio', 'lana mineral', 'espuma de poliuretano', 'espuma de polietileno', 'espuma de poliestireno', 'espuma de poliuretano expandido', 'espuma de poliuretano rígido', 'espuma de poliuretano flexible', 'espuma de poliuretano elástica', 'espuma de poliuretano plástica', 'espuma de poliuretano metálica', 'espuma de poliuretano textil', 'espuma de poliuretano sintética', 'espuma de poliuretano natural', 'espuma de poliuretano ecológica', 'espuma de poliuretano biodegradable', 'espuma de poliuretano reciclable', 'espuma de poliuretano reutilizable', 'espuma de poliuretano desechable', 'espuma de poliuretano lavable', 'espuma de poliuretano impermeable', 'espuma de poliuretano resistente', 'espuma de poliuretano durable', 'espuma de poliuretano fuerte', 'espuma de poliuretano robusta', 'espuma de poliuretano sólida', 'espuma de poliuretano compacta', 'espuma de poliuretano ligera', 'espuma de poliuretano pesada', 'espuma de poliuretano mediana', 'espuma de poliuretano pequeña', 'espuma de poliuretano grande', 'espuma de poliuretano extra grande', 'espuma de poliuretano mini', 'espuma de poliuretano micro', 'espuma de poliuretano nano', 'espuma de poliuretano pico', 'espuma de poliuretano femto', 'espuma de poliuretano atto', 'espuma de poliuretano zepto', 'espuma de poliuretano yocto', 'espuma de poliuretano deca', 'espuma de poliuretano hecto', 'espuma de poliuretano kilo', 'espuma de poliuretano mega', 'espuma de poliuretano giga', 'espuma de poliuretano tera', 'espuma de poliuretano peta', 'espuma de poliuretano exa', 'espuma de poliuretano zetta', 'espuma de poliuretano yotta'
            ];
            // Buscar productos que contengan todas las palabras clave (singular o plural)
            const likeQuery = palabras.map(() => '(LOWER(p.nombre_producto) LIKE ? OR LOWER(p.nombre_producto) LIKE ?)').join(' AND ');
            const likeParams = palabras.flatMap(w => [`%${w}%`, `%${w}s%`]);
            let rows = await db.query(`
                SELECT p.nombre_producto, i.stock
                FROM productos p
                LEFT JOIN inventario i ON i.id_producto = p.id_producto
                WHERE ${likeQuery}
                LIMIT 5
            `, likeParams);
            if (!rows.length && palabras.length > 1) {
                // Si no hay coincidencias con todas las palabras, busca por cada palabra individual (singular/plural)
                for (const w of palabras) {
                    let singular = w;
                    let plural = w + 's';
                    let pluralEs = w + 'es';
                    rows = await db.query(`
                        SELECT p.nombre_producto, i.stock
                        FROM productos p
                        LEFT JOIN inventario i ON i.id_producto = p.id_producto
                        WHERE LOWER(p.nombre_producto) LIKE ? OR LOWER(p.nombre_producto) LIKE ? OR LOWER(p.nombre_producto) LIKE ?
                        LIMIT 2
                    `, [`%${singular}%`, `%${plural}%`, `%${pluralEs}%`]);
                    if (rows.length) break;
                }
            }
            if (rows.length) {
                if (rows.length === 1) {
                    return `Stock de ${rows[0].nombre_producto}: ${rows[0].stock ?? 0}`;
                } else {
                    return rows.map(r => `Stock de ${r.nombre_producto}: ${r.stock ?? 0}`).join('\n');
                }
            } else {
                // Si no hay coincidencias, pero la palabra es una herramienta venezolana conocida, responde stock 0
                for (const w of palabras) {
                    if (herramientasVZLA.includes(w)) {
                        return `Stock de ${w}: 0`;
                    }
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
        const prompt = 'Responde de forma clara y útil para un cliente de ferretería.' + pregunta;
        const res = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 100 }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return (
            res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Lo siento, estoy entrenada solamente para contestar preguntas sobre FERREPOCO C,A'
        );
    } catch (e) {
        return 'Lo siento, estoy entrenada solamente para contestar preguntas sobre FERREPOCO C,A';
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
