/**
 * Safety Products AI Chatbot Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const newChatBtn = document.getElementById('new-chat-btn');

    // Preload both Niles frames so there's no flicker on first response
    ['nile_closed.png', 'nile_open.png'].forEach(src => {
        const img = new Image(); img.src = src;
    });

    // ── Auto-resize textarea ──────────────────────────────────────
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });

    // ── New Chat button (optional) ────────────────────────────────
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            chatMessages.innerHTML = '';
            addMessage('Hallo! Ik ben Niles, de mascotte van Safety Products. Hoe kan ik je vandaag helpen?', 'bot-static');
        });
    }

    // ── State ─────────────────────────────────────────────────────
    let isFirstMessage = true;
    let isSending = false;

    // ── Build Nile avatar HTML ────────────────────────────────────
    function nileAvatarHTML(extraClass) {
        const cls = extraClass ? ' ' + extraClass : '';
        return `<div class="avatar${cls}">
                    <div class="nile-layers">
                        <img src="nile_closed.png" class="mouth-closed" alt="Niles">
                        <img src="nile_open.png"   class="mouth-open"   alt="Niles">
                    </div>
                </div>`;
    }

    // ── Create an empty bot message shell (for streaming) ─────────
    function createBotMessageShell() {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'bot-message');
        const entranceClass = isFirstMessage ? 'walking-closer' : '';
        msgDiv.innerHTML = nileAvatarHTML(entranceClass) + '<div class="content"></div>';
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return {
            contentDiv: msgDiv.querySelector('.content'),
            avatarDiv: msgDiv.querySelector('.avatar'),
        };
    }

    // ── Add a static (non-streamed) message ───────────────────────
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        const isBot = sender === 'bot' || sender === 'bot-static';
        msgDiv.classList.add('message', isBot ? 'bot-message' : 'user-message');
        msgDiv.innerHTML =
            (isBot ? nileAvatarHTML() : '<div class="avatar"><div class="user-placeholder">U</div></div>') +
            `<div class="content">${formatText(text)}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ── Send Message (streaming) ──────────────────────────────────
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message || isSending) return;
        isSending = true;

        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        // Fade out mascot intro on first user turn
        const mascotIntro = document.querySelector('.mascot-intro');
        if (mascotIntro && !mascotIntro.classList.contains('fade-out')) {
            mascotIntro.classList.add('fade-out');
        }

        // Show loading dots while waiting for the first token
        const loadingId = addLoadingIndicator();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            // Switch to the real bot bubble as soon as the connection opens
            removeLoadingIndicator(loadingId);
            const { contentDiv, avatarDiv } = createBotMessageShell();
            avatarDiv.classList.add('is-talking');

            // Read SSE stream token by token
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // SSE lines end with \n; messages are separated by \n\n
                const lines = buffer.split('\n');
                buffer = lines.pop(); // save any incomplete line

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const payload = line.slice(6).trim();
                    if (payload === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(payload);
                        if (parsed.error) throw new Error(parsed.error);
                        if (parsed.token) {
                            fullText += parsed.token;
                            contentDiv.innerHTML = formatText(fullText);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }
                    } catch (e) { /* skip malformed chunk */ }
                }
            }

            avatarDiv.classList.remove('is-talking');
            if (isFirstMessage) isFirstMessage = false;

        } catch (err) {
            console.error('Stream error:', err);
            removeLoadingIndicator(loadingId);
            addMessage('De server is momenteel niet bereikbaar. Controleer of de backend draait.', 'bot');
        } finally {
            isSending = false;
        }
    }

    // ── Markdown → HTML ───────────────────────────────────────────
    function formatText(text) {
        let out = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        out = out.replace(/^- /gm, '• ');
        out = out.replace(/\n/g, '<br>');
        return out;
    }

    // ── Loading indicator (three dots) ────────────────────────────
    function addLoadingIndicator() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.classList.add('message', 'bot-message');
        div.innerHTML = nileAvatarHTML() + `
            <div class="content">
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeLoadingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // ── Event listeners ───────────────────────────────────────────
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
