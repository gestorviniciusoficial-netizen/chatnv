require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Rota de Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: "Mensagens inválidas." } });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json(completion);
  } catch (error) {
    console.error("Erro na OpenAI:", error);
    res.status(500).json({ 
      error: { 
        message: error.message || "Erro interno no servidor de chat." 
      } 
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor Nova Vida TI rodando em http://localhost:${port}`);
});
