const express = require('express');
const router = express.Router();
const { openai } = require('../openai');
const getSystemPrompt = require('../systemPrompt');
const { getRelevantProducts } = require('../retriever');

/**
 * POST /chat
 * Streams the AI response token-by-token using Server-Sent Events (SSE).
 */
router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Bericht is verplicht' });
    }

    // RAG: Zoek relevante producten op basis van het bericht van de gebruiker
    const relevantProducts = getRelevantProducts(message);
    const systemPromptContent = getSystemPrompt(relevantProducts);

    // Set SSE headers so the browser can read the stream progressively
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (res.flushHeaders) res.flushHeaders();

    try {
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPromptContent },
                { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
        });

        for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content ?? '';
            if (token) {
                // Send each token as an SSE "data" event
                res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
        }

        // Signal end of stream
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Streaming Error:', error.message);
        // Send error as a JSON event so the frontend can catch it
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
});

module.exports = router;
