
import axios from 'axios';

// Ahora el frontend pregunta al backend, que decide si responde desde la base de datos o Gemini
export async function askGemini(question) {
    try {
        const res = await axios.post('/api/chatbot', { question });
        return res.data?.answer || 'No se pudo obtener respuesta.';
    } catch (e) {
        return 'Error al conectar con el chatbot.';
    }
}
