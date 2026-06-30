# 🧠 LangChain JS/TS: The Complete Reference Manual

This document is a comprehensive, deep-dive reference manual covering every core concept, abstraction, interface, and design pattern inside the **LangChain JS/TS** ecosystem. 

Whether a concept is used in your current project or not, it is detailed below to serve as your ultimate reference guide for building production-grade AI applications and agents.

---

## 🗺️ Table of Contents
1. [Core Philosophy & Architecture](#1-core-philosophy--architecture)
2. [The Model Layer (LLMs vs. Chat Models)](#2-the-model-layer-llms-vs-chat-models)
3. [Prompts, Templates, and Messages](#3-prompts-templates-and-messages)
4. [Output Parsers & Structured Formats](#4-output-parsers--structured-formats)
5. [LangChain Expression Language (LCEL) & Runnables](#5-langchain-expression-language-lcel--runnables)
6. [Memory & Conversation State Management](#6-memory--conversation-state-management)
7. [Retrieval-Augmented Generation (RAG) & Vector Databases](#7-retrieval-augmented-generation-rag--vector-databases)
8. [Agents, Tools, and Decision-Making Loops](#8-agents-tools-and-decision-making-loops)
9. [Stateful Orchestration: LangGraph](#9-stateful-orchestration-langgraph)
10. [Callbacks, Observability, and LangSmith](#10-callbacks-observability-and-langsmith)

---

## 1. Core Philosophy & Architecture

At its core, LangChain is **not** a simple API wrapper. It is a framework designed to solve the challenges of building applications powered by Large Language Models (LLMs).

### The Three Pillars:
1. **Components**: Modular, reusable abstractions for working with LLMs (e.g., Models, Prompts, Parsers).
2. **Off-the-shelf Chains**: Pre-built collections of components assembled to perform specific tasks (e.g., QA over documents).
3. **Composability (LCEL)**: A declarative way to link components together to build custom cognitive pipelines.

---

## 2. The Model Layer (LLMs vs. Chat Models)

LangChain divides language models into two distinct categories based on their underlying API signature:

```
                  ┌──────────────────────┐
                  │     BaseLanguage     │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   ┌─────────────────┐               ┌──────────────────┐
   │      LLMs       │               │   Chat Models    │
   │ (Text In / Out) │               │(Messages In / Out│
   └─────────────────┘               └──────────────────┘
```

### A. Large Language Models (LLMs)
* **API Signature**: Accepts a raw string (prompt) and returns a raw string completion.
* **Class**: `BaseLLM` (e.g., `OpenAI` client wrapper for legacy text-based models like `gpt-3.5-turbo-instruct`).
* **Example Usage**:
  ```typescript
  import { OpenAI } from "@langchain/openai";
  const model = new OpenAI({ modelName: "gpt-3.5-turbo-instruct" });
  const res = await model.invoke("Once upon a time "); // returns string
  ```

### B. Chat Models (Modern Standard)
* **API Signature**: Accepts an array of Chat Messages and returns a single Chat Message completion.
* **Class**: `BaseChatModel` (e.g., `ChatOpenAI`, `ChatGoogle`, `ChatAnthropic`).
* **Example Usage**:
  ```typescript
  import { ChatOpenAI } from "@langchain/openai";
  import { HumanMessage } from "@langchain/core/messages";
  const chat = new ChatOpenAI({ model: "gpt-4o" });
  const res = await chat.invoke([new HumanMessage("Hello")]); // returns AIMessage
  ```

---

## 3. Prompts, Templates, and Messages

Prompt Templates parameterize prompt generation, acting as reusable functions that output formatted inputs for the LLM.

### A. Prompt Abstractions
* **`PromptTemplate`**: For generating raw strings (typically used with legacy LLMs).
  ```typescript
  const prompt = PromptTemplate.fromTemplate("Tell me a {adjective} joke about {topic}.");
  const formatted = await prompt.format({ adjective: "sad", topic: "data science" });
  ```
* **`ChatPromptTemplate`**: For generating message arrays (used with modern Chat Models).
  ```typescript
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an expert cook."],
    ["human", "How do I make {dish}?"],
  ]);
  ```

### B. The Message Hierarchy
Chat Models exchange structural message objects instead of raw strings. LangChain maps these to classes:
1. **`SystemMessage`**: Guides LLM behavior, boundaries, and personality. Sent first.
2. **`HumanMessage`**: Represents the user's input.
3. **`AIMessage`**: Represents the model's response. Can include metadata like `tool_calls`.
4. **`ToolMessage`**: Passes the execution result of an external tool back to the LLM to continue reasoning.
5. **`ChatMessage`**: A generic message type accepting arbitrary roles (e.g., for custom API requirements).

---

## 4. Output Parsers & Structured Formats

Output Parsers turn raw text or message completions into structured data (JSON, classes, lists, markdown).

```
[Raw AI Text] ───► (Output Parser) ───► [Typed JavaScript Object]
```

### A. Custom Output Parsers
* **`StringOutputParser`**: Extracts the text content from an `AIMessage` and discards metadata.
* **`JsonOutputParser`**: Extracts and parses valid JSON content out of markdown code blocks.
* **`CommaSeparatedListOutputParser`**: Splits comma-delimited strings into a clean JS array.

### B. Structured Outputs (Zod & Schema Binding)
Modern model providers support Native Tool Calling. Instead of parsing text, LangChain binds a schema directly to the model using `.withStructuredOutput()`:
```typescript
const MySchema = z.object({
  approved: z.boolean(),
  reason: z.string(),
});

// Instructs model API to return JSON matching the Zod schema configuration
const structuredModel = model.withStructuredOutput(MySchema);
```

---

## 5. LangChain Expression Language (LCEL) & Runnables

**LCEL** is a declarative syntax to link Runnables together. Any class that implements the **Runnable Interface** can be piped.

### A. The Runnables Protocol
Every Runnable implements these core async methods:
* **`.invoke(input)`**: Processes a single input and returns a single output synchronously in execution flow.
* **`.stream(input)`**: Yields output chunks in real-time as they are generated by the model.
* **`.batch(inputs)`**: Executes multiple inputs in parallel, optimizing concurrency.
* **`.streamLog(input)`**: Streams changes to the internal state of the chain (useful for debugging intermediate steps).

### B. LCEL Pipelines (`.pipe()`)
The `.pipe()` method sequences runnables together:
```typescript
// Flow: Format Input -> Prompt -> Model -> Parse to String
const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());
```

### C. Advanced LCEL Abstractions
* **`RunnableParallel`**: Executes multiple tasks concurrently.
  ```typescript
  const parallelChain = RunnableParallel.from({
    joke: jokeChain,
    poem: poemChain,
  });
  ```
* **`RunnablePassthrough`**: Passes input data forward untouched, useful for injecting parameters.
  ```typescript
  const chain = RunnableSequence.from([
    { context: retriever, question: new RunnablePassthrough() },
    prompt,
    model
  ]);
  ```
* **`RunnableBranch`**: Implements routing conditions (if/else chains) dynamically inside the pipeline.
* **`.withFallbacks()`**: Attaches a list of fallback runnables to handle timeouts, rate-limits, or API crashes automatically.

---

## 6. Memory & Conversation State Management

LLMs are stateless. Memory stores, retrieves, and updates past conversation turns, merging history into current context windows.

```
User Input ──────┐
                 ▼
Memory (Load) ───► [Format Prompt Template] ───► (LLM) ───► Memory (Save)
```

### Types of Memory Classes:
1. **`BufferMemory`**: Keeps a raw history of all turns in a list (simple, but expands context window size).
2. **`BufferWindowMemory`**: Keeps only the last `K` turns, discarding older messages to conserve token costs.
3. **`ConversationSummaryMemory`**: Uses an LLM to periodically summarize conversation history in a running summary, representing hours of chats in a single paragraph.
4. **`ChatMessageHistory`**: Backs up raw messages directly to database adapters (Redis, MongoDB, Postgres).

---

## 7. Retrieval-Augmented Generation (RAG) & Vector Databases

RAG injects custom, private, or real-time documents into prompt templates, allowing the LLM to answer questions using search indices instead of internal knowledge.

```
[Document] ──► (Splitter) ──► (Embedding Model) ──► [Vector DB] ──► (Retriever) ──► [LLM Context]
```

### A. Document Loaders
Imports text datasets from third-party sources:
* `PDFLoader`, `DirectoryLoader`, `CheerioWebBaseLoader` (web scrapers), `NotionLoader`.

### B. Document Transformers (Text Splitters)
LLM context windows are limited. Large documents must be chunked:
* **`RecursiveCharacterTextSplitter`**: Split chunks recursively using separators (e.g. newlines, spaces) to keep paragraphs and sentences together.
* **`CharacterTextSplitter`**: Simple split based on absolute character index counts.

### C. Embeddings Models
Converts semantic text strings into dense floating-point vector arrays:
* `OpenAIEmbeddings`, `GoogleGeckoEmbeddings`.

### D. Vector Stores
Databases built to perform fast vector similarity searches (Cosine Similarity, Euclidean Distance):
* `Pinecone`, `Chroma`, `HNSWLib` (in-memory), `SupabaseVectorStore`, `PGVectorStore`.

### E. Retrievers
A wrapper class that queries a vector database and returns relevant document objects:
* **`VectorStoreRetriever`**: Standard semantic similarity finder.
* **`ParentDocumentRetriever`**: Indexes small chunks to match queries, but returns the larger parent document context to the LLM.
* **`MultiQueryRetriever`**: Uses an LLM to generate multiple versions of the user's query from different angles to perform more thorough retrieval lookups.

---

## 8. Agents, Tools, and Decision-Making Loops

An **Agent** uses an LLM to dynamically determine *which actions to take* and *in what order*.

```
Loop: [Think (LLM)] ──► [Action (Tool)] ──► [Observe (Result)] ──► [Repeat / Done]
```

### A. Tools
External functions the LLM can invoke. Defined with a name, description, and Zod input schema:
```typescript
import { tool } from "@langchain/core/tools";

const searchTool = tool(async ({ query }) => {
  return executeSearch(query);
}, {
  name: "search",
  description: "Search Google for current events.",
  schema: z.object({ query: z.string() })
});
```

### B. Agent Executors (ReAct Framework)
The system loop that calls the LLM, executes the requested tools, returns outcomes, and prompts the LLM again until it determines the task is complete.
* **ReAct Agent**: (*Reason + Action*) Uses structured logic patterns (Thought, Action, Action Input, Observation, Thought...) to solve tasks.
* **OpenAI Tools Agent**: Leverages native function calling APIs for faster, highly structured tool selection.

---

## 9. Stateful Orchestration: LangGraph

As agents grow complex, linear chains and simple loops fail. **LangGraph** (built by LangChain) introduces stateful, multi-actor orchestration using graphs.

```
       ┌──────────────┐
  ┌───►│  State Node  ├───┐
  │    └──────────────┘   │
  │                       ▼
(Decision Edge)    (Decision Edge)
  ▲                       │
  │    ┌──────────────┐   │
  └────│  State Node  │◄──┘
       └──────────────┘
```

* **Nodes**: Standard JavaScript functions that execute tasks (e.g. "Draft Email", "Web Search") and modify the shared Graph State.
* **Edges**: Control-flow rules directing execution from one Node to another.
* **Conditional Edges**: Dynamic routing nodes that evaluate the Graph State and decide which path to follow next.
* **State**: A persistent, thread-safe memory object that stores variables, files, or message histories across all execution steps.

LangGraph is the modern replacement for legacy `AgentExecutor` implementations when building complex multi-agent workflows.

---

## 10. Callbacks, Observability, and LangSmith

AI applications are complex to debug. LangChain features a robust callback registry to track execution lifecycles.

### A. Callback Handlers
You can hook into events by writing custom handlers or passing lifecycle callbacks:
```typescript
const chain = promptTemplate.pipe(model);

await chain.invoke({ ... }, {
  callbacks: [{
    handleLLMStart: async (llm, prompts) => {
      console.log("LLM Call Started with prompts: ", prompts);
    },
    handleChainEnd: async (outputs) => {
      console.log("Pipeline Finished. Outputs: ", outputs);
    },
    handleToolStart: async (tool, input) => {
      console.log(`Tool ${tool.name} invoked with inputs:`, input);
    }
  }]
});
```

### B. LangSmith
By setting simple environment variables, LangChain automatically registers every execution run, prompt, tool execution, and token usage log to **LangSmith** (a dashboard portal for tracing, evaluating, and testing LLM applications):
```ini
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your-langsmith-api-key
LANGCHAIN_PROJECT=my-movie-app
```
Using LangSmith, you get visual trace diagrams showing the exact latency, raw prompt variables, JSON formatting configurations, and cost structures of your production workflows.
