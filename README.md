# Safety Products AI Chatbot

A complete, professional chatbot solution for "Safety Products", built with Node.js, Express, and the OpenAI ChatGPT API. This project is designed as a portfolio piece showing AI integration, full-stack development, and clean UI/UX design.

## Features

- **Real-time AI Chat**: Powered by OpenAI's `gpt-3.5-turbo`.
- **Predefined System Prompt**: Tailored response behavior for industrial safety products.
- **Modern UI**: Floating chat widget with industrial branding (Dark Blue / Safety Orange).
- **Responsive Design**: Works seamlessly on mobile and desktop.
- **Embedded Widget**: Clean separation between frontend assets and backend logic.

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Backend**: Node.js, Express.
- **AI Engine**: OpenAI API (Chat Completion).
- **Styling**: Modern CSS with CSS Variables and animations.

## Prerequisites

- Node.js installed on your machine.
- An OpenAI API key (from [platform.openai.com](https://platform.openai.com/)).

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd chatbot-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```env
     OPENAI_API_KEY=your_key_here
     PORT=3000
     ```

## Running Locally

To start the server:
```bash
npm start
```
The chatbot will be available at `http://localhost:3000`.

## Project Structure

```text
/chatbot-project
  /server
    server.js        # Entry point
    openai.js        # AI Integration
    systemPrompt.js  # AI Instructions
    /routes
      chat.js        # Chat endpoint
  /public
    index.html       # Frontend structure
    styles.css       # Corporate branding
    chat.js          # Widget logic
  .env.example       # Environment template
  package.json       # Dependencies
  README.md          # Documentation
```

## Deployment

### Vercel / Render
This project is ready for deployment on platforms like Vercel or Render. 
- Ensure you set the `OPENAI_API_KEY` as an environment variable in your deployment settings.
- The `index.html` file in the `/public` folder is automatically served as the root.

## License
MIT
