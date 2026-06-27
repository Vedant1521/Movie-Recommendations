# 🎬 LangChain AI Movie Recommendations & Concepts Showcase

A full-stack,  application demonstrating how to build a production-ready AI agent using **LangChain JS/TS**, **Express (Node.js)**, **Next.js**, and **Tailwind CSS**.

The project contains two key user experiences:
1. **AI Movie Recommendations Dashboard**: A live client application that captures user mood and genre preferences to query the backend for structured AI-generated movie options.
2. **Interactive Concepts Showcase**: An interactive educational portal mapping frontend concepts to actual backend LangChain implementations (LCEL, Prompts, Structuring, etc.).

---

## 🏛️ Application Architecture

The application is structured as a decoupled monorepo containing a frontend and a backend directory:

```mermaid
graph TD
    User([User]) -->|Inputs: userPrompt, genre, mood, count| FE[Next.js Client]
    FE -->|POST /api/recommend| BE[Express Server Router]
    BE -->|Calls Controller| Controller[recommended.controller.ts]
    Controller -->|Calls Service| Service[langchain.service.ts]
    
    subgraph LangChain Pipeline [backend/src/services/langchain.service.ts]
        Service -->|Binds inputs| Prompt[ChatPromptTemplate]
        Prompt -->|Connects via LCEL .pipe| Model[ChatOpenAI / ChatGoogle]
        Model -->|Structured Output| Structured[withStructuredOutput]
    end

    Structured -->|Validates via Zod Schema| Schema[movie.schema.ts]
    Schema -->|Returns typed Recommendations| Controller
    Controller -->|JSON Response| FE
    FE -->|Renders UI Cards| MovieCards[MovieCard Components]
```

---

## 🛠️ Tech Stack

### Backend
- **Core Runtime**: [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Server Framework**: [Express](https://expressjs.com/) (REST APIs, CORS configuration)
- **AI Integration**: [LangChain Core](https://js.langchain.com/) for orchestration
- **Models**: Swappable integration for `@langchain/openai` and `@langchain/google` (Gemini SDK)
- **Validation**: [Zod](https://zod.dev/) for type-safe structured JSON output schemas
- **Development Tools**: [tsx](https://github.com/privatenumber/tsx) for fast TypeScript execution and hot-reloading

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (React 19 App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom gradient schemes
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Card, Button, Select, Skeleton, Textarea)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Repository Structure

```
langchain-crash-course/
├── backend/                       # Node.js + Express + LangChain Backend
│   ├── src/
│   │   ├── controllers/           # API request controllers
│   │   │   └── recommended.controller.ts
│   │   ├── routes/                # Express API routes definition
│   │   │   └── recommended.routes.ts
│   │   ├── schemas/               # Zod validation and structured schemas
│   │   │   └── movie.schema.ts
│   │   ├── services/              # Core LangChain LLM setup & LCEL pipelines
│   │   │   └── langchain.service.ts
│   │   └── index.ts               # Server entrypoint and configuration
│   ├── .env                       # Backend API keys and server port settings
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                      # Next.js Client App
    ├── src/
    │   ├── app/                   # App Router pages
    │   │   ├── showcase/          # /showcase educational dashboard
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx         # Root app layout
    │   │   └── page.tsx           # Home recommendation app page
    │   ├── components/            # Custom application UI components
    │   │   ├── ui/                # Shadcn UI primitives
    │   │   ├── concepts-showcase.tsx
    │   │   ├── movie-card-skeleton.tsx
    │   │   ├── movie-card.tsx
    │   │   └── recommendation-app.tsx
    │   ├── lib/                  
    │   │   ├── api.ts             # Fetch utility for calling the Backend API
    │   │   └── utils.ts
    │   └── types/
    │       └── movie.ts           # Shared TypeScript interfaces
    ├── .env                       # Frontend public environment settings
    ├── package.json
    └── tsconfig.json
```

---

## 🧠 Core LangChain Concepts Implemented

The application demonstrates five central concepts of modern AI agent architecture:

1. **Swappable LLM Providers**
   Configured in [langchain.service.ts](file:///C:/Users/gupta/Downloads/1782308214430-24f5e577b633953a/langchain-crash-course/backend/src/services/langchain.service.ts). LangChain's unified interface makes it easy to switch models (e.g. `ChatOpenAI` or `ChatGoogle`) simply by updating an environment variable.

2. **Chat Prompt Templates**
   Defines the structure of conversations utilizing prompt templates to feed external parameters into instructions.
   - **System Instruction**: Establishes behavior and strict formatting rules.
   - **Human Message**: Formats user preferences (`{userPrompt}`, `{genre}`, `{mood}`, `{count}`) into a query.

3. **LangChain Expression Language (LCEL)**
   Enables composability by chaining components together using a `.pipe()` operator. The input is passed sequentially through the prompt, model, and output parser.

4. **Structured Outputs**
   Utilizes `.withStructuredOutput()` bound to a Zod schema to instruct the model to return syntactically valid JSON matching a defined schema. No manual JSON parsing or regex logic is required.

5. **Zod Validation Schema**
   Located in [movie.schema.ts](file:///C:/Users/gupta/Downloads/1782308214430-24f5e577b633953a/langchain-crash-course/backend/src/schemas/movie.schema.ts), it defines the exact field details, types, and descriptive instructions for the AI engine to generate consistent metadata (`title`, `year`, `genre`, `cast`, `reason`, `rating`).

---

## 🚀 Setup & Installation Steps

### 1. Clone & Navigate to Backend

First, open your terminal and navigate to the backend directory:
```bash
cd backend
```

### 2. Configure Backend Environment
Create a `.env` file inside the `backend/` directory with the following structure:
```ini
PORT=8000
LLM_PROVIDER=openai       # Choose 'openai' or 'google'
OPENAI_API_KEY=your-openai-api-key
GOOGLE_API_KEY=your-gemini-api-key
OPENAI_MODEL=gpt-4o-mini
```

### 3. Install & Start the Backend
Install the server dependencies and start the hot-reloading dev server:
```bash
npm install
npm run dev
```
The backend server will run at [http://localhost:8000](http://localhost:8000). You can verify its health at [http://localhost:8000/health](http://localhost:8000/health).

---

### 4. Setup the Frontend
Open a new terminal window, and navigate to the frontend directory:
```bash
cd frontend
```

### 5. Configure Frontend Environment
Ensure the `.env` file inside the `frontend/` directory points to the backend API url:
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 6. Install & Start the Frontend
Install dependencies and run the client dev server:
```bash
npm install
npm run dev
```
The frontend application will boot up at [http://localhost:3000](http://localhost:3000).

---

## 🔌 API Endpoints

### 1. Check Server Health
- **URL**: `/health`
- **Method**: `GET`
- **Response**:
```json
{
  "status": "ok"
}
```

### 2. Generate Recommendations
- **URL**: `/api/recommend`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userPrompt": "Suggest sci-fi movies set in deep space",
  "genre": "sci-fi",
  "mood": "curious",
  "count": 3
}
```
- **Response**:
```json
{
  "movies": [
    {
      "title": "Interstellar",
      "year": 2014,
      "genre": ["Sci-Fi", "Drama", "Adventure"],
      "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      "reason": "It offers an intense depiction of space travel, matching your curious mood and request for a deep space setting.",
      "rating": 8.7
    }
  ]
}
```
