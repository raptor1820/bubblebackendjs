# 🫧 Bubble Burst Backend

<div align="center">

**Backend API for the Bubble Burst project - Break out of your information bubble with AI-powered opposing perspectives**

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-f472b6?style=for-the-badge&logo=bun)](https://bun.sh)
[![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 What is Bubble Burst Backend?

Bubble Burst Backend is the server-side component of the **Bubble Burst** project - an intelligent API service designed to combat confirmation bias and filter bubbles. Give it any article URL, and it will use AI to find and return articles with **opposing viewpoints** on the same topic.

This backend powers the Bubble Burst application by providing the core intelligence layer that analyzes articles, generates smart search queries, and discovers opposing perspectives. In an era of echo chambers and algorithmic content curation, it helps users see the full picture by exposing them to diverse viewpoints they might otherwise never encounter.

## ✨ Features

-   🤖 **AI-Powered Analysis** - Uses GPT-4 Turbo to understand article sentiment and topic
-   🔍 **Smart Search** - Automatically generates optimized Google queries for opposing viewpoints
-   📰 **Article Extraction** - Cleanly extracts and processes article content
-   ⚡ **Lightning Fast** - Built on Bun for maximum performance
-   🌐 **RESTful API** - Simple HTTP interface for easy integration
-   🔒 **CORS Enabled** - Ready for web application integration

## 🏗️ Architecture

```
┌─────────────────┐
│   Client        │
│   Request       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Hono Web Server                   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Driver (Orchestration)            │
└────────┬────────────────────────────┘
         │
    ┌────┴────┬──────────────┬────────────┐
    │         │              │            │
    ▼         ▼              ▼            ▼
┌────────┐ ┌──────┐  ┌─────────┐  ┌──────────┐
│Extract │ │ GPT-4│  │ Google  │  │  Return  │
│Article │→│Query │→ │ Custom  │→ │ Articles │
│ Text   │ │ Gen  │  │ Search  │  │          │
└────────┘ └──────┘  └─────────┘  └──────────┘
```

## 🚀 Quick Start

### Prerequisites

-   [Bun](https://bun.sh) installed on your system
-   OpenAI API key
-   Google Custom Search API key and CX key

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/raptor1820/bubblebackendjs.git
    cd bubblebackendjs
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root directory:

    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    GOOGLE_SEARCH_KEY=your_google_search_api_key
    GOOGLE_CX_KEY=your_google_cx_key
    ```

4. **Start the server**
    ```bash
    bun run dev
    ```

The server will start on the default Hono port (typically `3000`).

## 📡 API Usage

### Endpoint

```
GET /?url={article_url}
```

### Parameters

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `url`     | string | Yes      | The URL of the article to analyze |

### Example Request

```bash
curl "http://localhost:3000/?url=https://example.com/article"
```

### Example Response

```json
[
    {
        "title": "Alternative Perspective on Topic",
        "displayLink": "example.com",
        "link": "https://example.com/opposing-view",
        "read_time": "0 min"
    },
    {
        "title": "Different Take on Subject",
        "displayLink": "news.com",
        "link": "https://news.com/counterpoint",
        "read_time": "0 min"
    }
]
```

### Error Response

```json
{
    "error": "error"
}
```

## 🛠️ Technology Stack

| Technology                                                                                 | Purpose                     |
| ------------------------------------------------------------------------------------------ | --------------------------- |
| [Bun](https://bun.sh)                                                                      | Runtime & Package Manager   |
| [Hono](https://hono.dev)                                                                   | Lightweight Web Framework   |
| [OpenAI GPT-4](https://openai.com)                                                         | AI-Powered Query Generation |
| [Google Custom Search API](https://developers.google.com/custom-search)                    | Article Discovery           |
| [@extractus/article-extractor](https://www.npmjs.com/package/@extractus/article-extractor) | Content Extraction          |
| [TypeScript](https://www.typescriptlang.org)                                               | Type Safety                 |

## 🔧 How It Works

1. **Article Extraction**: The service fetches the provided URL and extracts the main article text using `@extractus/article-extractor`, stripping away HTML and leaving clean content.

2. **AI Analysis**: The extracted text is sent to GPT-4 Turbo with a specialized prompt that:

    - Identifies the main subject of the article
    - Determines the sentiment/perspective
    - Generates a Google search query designed to find opposing viewpoints

3. **Search & Retrieve**: The AI-generated query is used with Google Custom Search API to find relevant articles with opposing perspectives.

4. **Response**: The service returns a curated list of articles with titles, links, and metadata.

## 📂 Project Structure

```
bubblebackendjs/
├── src/
│   ├── index.ts              # Main server & routing
│   ├── driver.ts             # Orchestration logic
│   ├── extractArticleText.ts # Article content extraction
│   ├── genGoogleQuery.ts     # AI query generation
│   └── getArticles.ts        # Google search integration
├── package.json
├── tsconfig.json
├── bun.lockb
└── README.md
```

## 🎨 Use Cases

-   **News Aggregation Apps**: Show users both sides of controversial topics
-   **Research Tools**: Help researchers find counterarguments and alternative perspectives
-   **Educational Platforms**: Teach critical thinking by exposing students to diverse viewpoints
-   **Browser Extensions**: Add a "See Opposing Views" button to any article
-   **Content Moderation**: Understand the full context of polarizing topics

## ⚙️ Configuration

### OpenAI Settings

The GPT-4 query generation can be customized in `src/genGoogleQuery.ts`:

```typescript
{
  model: "gpt-4-turbo",
  temperature: 0.7,      // Creativity vs consistency
  max_tokens: 20,        // Query length limit
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}
```

## 🔗 Related Projects

This is the **backend** component of the Bubble Burst project. The complete Bubble Burst ecosystem includes:

-   **Backend API** (this repository) - The intelligent service layer
-   **Frontend Application** - User interface for interacting with the service

## 🤝 Contributing

Contributions are welcome! Here are some ideas for improvements:

-   Add caching to reduce API costs
-   Implement rate limiting
-   Add support for multiple languages
-   Include article summaries in responses
-   Add sentiment analysis scores
-   Enhance integration with frontend
-   Add automated tests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

-   Built with [Bun](https://bun.sh) - the fast all-in-one JavaScript runtime
-   Powered by [OpenAI](https://openai.com) - making AI accessible
-   Search by [Google Custom Search API](https://developers.google.com/custom-search)

## 📧 Contact

**Repository**: [raptor1820/bubblebackendjs](https://github.com/raptor1820/bubblebackendjs)

---

<div align="center">

**Built with ❤️ to promote open-minded thinking**

If this project helps you see different perspectives, consider giving it a ⭐!

</div>
