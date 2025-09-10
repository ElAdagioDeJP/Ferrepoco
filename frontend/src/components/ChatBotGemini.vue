<template>
  <div v-if="show !== false">
    <button v-if="!open" class="chatbot-fab" @click="open = true">
      💬 Pocobot
    </button>
    <transition name="fade">
      <div v-if="open" class="chatbot-widget">
        <div class="chatbot-header">
          <span>Pocobot</span>
          <button class="close-btn" @click="open = false">✕</button>
        </div>
        <div class="chatbot-container">
          <div class="chat-messages" ref="messagesEnd">
            <div v-for="(msg, idx) in messages" :key="idx" :class="msg.role === 'user' ? 'user-msg' : 'bot-msg'">
              <span>{{ msg.role === 'user' ? 'Tú' : 'Pocobot' }}:</span>
              <span v-if="msg.role === 'user'">{{ msg.content }}</span>
              <span v-else v-html="renderMarkdown(msg.content)"></span>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="chat-input">
            <input v-model="input" type="text" placeholder="Escribe tu pregunta..." :disabled="loading" />
            <button type="submit" :disabled="loading || !input.trim()">Enviar</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, defineProps } from 'vue';
import { askGemini } from '@/services/geminiService';
import { marked } from 'marked';

const props = defineProps({
  show: { type: Boolean, default: true }
});

const open = ref(false);
const messages = ref([
  { role: 'bot', content: '¡Hola! ¿En qué puedo ayudarte hoy?' }
]);
const input = ref('');
const loading = ref(false);
const messagesEnd = ref(null);

function renderMarkdown(text) {
  return marked.parse(text || '');
}

async function sendMessage() {
  if (!input.value.trim()) return;
  const userMsg = { role: 'user', content: input.value };
  messages.value.push(userMsg);
  loading.value = true;
  const question = input.value;
  input.value = '';
  await nextTick();
  messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
  try {
    const answer = await askGemini(question);
    messages.value.push({ role: 'bot', content: answer });
  } catch (e) {
    messages.value.push({ role: 'bot', content: 'Ocurrió un error al conectar con el servidor.' });
  } finally {
    loading.value = false;
    await nextTick();
    messagesEnd.value.scrollTop = messagesEnd.value.scrollHeight;
  }
}
</script>

<style scoped>
  .chatbot-fab {
    position: fixed;
    right: 32px;
    bottom: 96px;
    z-index: 1000;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 16px 24px;
    font-size: 1.1em;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    cursor: pointer;
    transition: background 0.2s;
  }
  .chatbot-fab:hover {
    background: #1e40af;
  }
  .chatbot-widget {
    position: fixed;
    right: 24px;
    bottom: 88px;
    z-index: 1001;
    width: 370px;
    max-width: 95vw;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: fadeInUp 0.25s;
  }
@keyframes fadeInUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.chatbot-header {
  background: #2563eb;
  color: #fff;
  padding: 12px 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
}
.chatbot-container {
  border: none;
  border-radius: 0;
  background: #fff;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 420px;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
.user-msg {
  text-align: right;
  margin-bottom: 8px;
  color: #2563eb;
}
.bot-msg {
  text-align: left;
  margin-bottom: 8px;
  color: #059669;
}
.bot-msg :deep(p),
.bot-msg :deep(ul),
.bot-msg :deep(ol),
.bot-msg :deep(li),
.bot-msg :deep(strong),
.bot-msg :deep(em),
.bot-msg :deep(code),
.bot-msg :deep(pre) {
  margin: 0 0 4px 0;
  font-size: 1em;
}
.bot-msg :deep(ul), .bot-msg :deep(ol) {
  padding-left: 1.2em;
}
.bot-msg :deep(code) {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 2px 4px;
  font-family: monospace;
}
.chat-input {
  display: flex;
  border-top: 1px solid #e5e7eb;
  padding: 8px;
}
.chat-input input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
  margin-right: 8px;
}
.chat-input button {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
