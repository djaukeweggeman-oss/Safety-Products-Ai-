const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, 'products.json');

/**
 * Een eenvoudige 'retriever' die producten zoekt op basis van keywords.
 * Voor een productie RAG-systeem zouden hier OpenAI Embeddings worden gebruikt.
 */
function getRelevantProducts(query, limit = 5) {
    try {
        const rawData = fs.readFileSync(PRODUCTS_PATH, 'utf8');
        const products = JSON.parse(rawData);

        const keywords = query.toLowerCase().split(' ').filter(word => word.length > 2);

        // Score de producten op basis van hoe vaak keywords voorkomen in naam of beschrijving
        const scoredProducts = products.map(product => {
            let score = 0;
            const content = (product.name + ' ' + product.description).toLowerCase();

            keywords.forEach(keyword => {
                if (content.includes(keyword)) {
                    score += 1;
                }
            });

            return { ...product, score };
        });

        // Sorteer op score en filter producten zonder match
        return scoredProducts
            .filter(p => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

    } catch (error) {
        console.error("Retriever Error:", error);
        return [];
    }
}

module.exports = {
    getRelevantProducts
};
