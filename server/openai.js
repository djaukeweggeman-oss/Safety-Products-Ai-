const OpenAI = require('openai');
require('dotenv').config();

// Create a single OpenAI client instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Utility for non-streaming chat requests (optional)
 */
async function getChatResponse(userMessage, systemPrompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Utility Error:", error);
        throw error;
    }
}

module.exports = {
    openai,
    getChatResponse
};
