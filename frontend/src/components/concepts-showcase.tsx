"use client";

import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Bot,
  Braces,
  Cpu,
  FileJson,
  GitBranch,
  Layers,
  MessageSquare,
  Play,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ConceptCard = {
  id: string;
  section: string;
  title: string;
  description: string;
  analogy?: string;
  code?: string;
  flow?: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  badge: string;
};

const CONCEPTS: ConceptCard[] = [
  {
    id: "what-is-langchain",
    section: "Foundation",
    title: "What is LangChain?",
    description:
      "A framework of composable AI building blocks for JavaScript/TypeScript. You stop calling LLMs with raw text blobs and start orchestrating pipelines — models, prompts, chains, parsers.",
    analogy: "Not just calling AI — orchestrating AI.",
    flow: "User Input → LangChain Pipeline → Usable App Data",
    icon: Sparkles,
    accent: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100 text-violet-700",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    id: "building-blocks",
    section: "Foundation",
    title: "Core Building Blocks",
    description:
      "Every LangChain app combines: Model, Prompt Template, Chain (LCEL), Structured Output, and optional Memory. Our movie app uses all of these in the backend.",
    flow: "Prompt → Model → Parser → JSON → UI Cards",
    icon: Blocks,
    accent: "from-indigo-500 to-blue-600",
    iconBg: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    id: "models",
    section: "Models",
    title: "OpenAI + Gemini Integration",
    description:
      "LangChain wraps different providers behind one interface. We use ChatOpenAI (default) or ChatGoogle via LLM_PROVIDER in .env — same chain code, swap the model class.",
    code: "LLM_PROVIDER=openai | google\nChatOpenAI / ChatGoogle",
    icon: Cpu,
    accent: "from-sky-500 to-cyan-600",
    iconBg: "bg-sky-100 text-sky-700",
    badge: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    id: "prompt-template",
    section: "Prompts",
    title: "Prompt Template",
    description:
      "ChatPromptTemplate = reusable prompt with {variables}. Same structure every request — fill in userPrompt, genre, mood, count dynamically instead of hardcoding strings.",
    analogy: "Fill-in-the-blank form for your AI instruction.",
    code: "ChatPromptTemplate.fromMessages([...])",
    icon: MessageSquare,
    accent: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "system-message",
    section: "Prompts",
    title: "System Message",
    description:
      "Defines WHO the AI is and HOW it should behave. Sent on every request before the user message. Sets rules: movie expert, intentional picks, no generic lists.",
    code: '["system", "You are a movie expert..."]',
    icon: Bot,
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 text-amber-800",
    badge: "bg-amber-100 text-amber-900 border-amber-200",
  },
  {
    id: "human-message",
    section: "Prompts",
    title: "Human Message",
    description:
      "The user's actual request with placeholders. LangChain replaces {userPrompt}, {genre}, {mood}, {count} at runtime from the API body or frontend form.",
    code: '["human", "User request: {userPrompt}..."]',
    icon: User,
    accent: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-100 text-rose-700",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    id: "lcel",
    section: "Chains",
    title: "LCEL — .pipe()",
    description:
      "LangChain Expression Language connects components into a pipeline. Each .pipe() passes output to the next step — like an assembly line for AI.",
    code: "promptTemplate.pipe(structuredModel)",
    flow: "Input → Prompt → Model → Output",
    icon: GitBranch,
    accent: "from-fuchsia-500 to-violet-600",
    iconBg: "bg-fuchsia-100 text-fuchsia-700",
    badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
  {
    id: "invoke",
    section: "Chains",
    title: ".invoke()",
    description:
      "Runnable method — send one input, get one full response. Every chain and model supports .invoke(). Also: .stream() for chunks, .batch() for parallel runs.",
    code: "await chain.invoke({ userPrompt, genre, mood, count })",
    icon: Play,
    accent: "from-lime-500 to-green-600",
    iconBg: "bg-lime-100 text-lime-800",
    badge: "bg-lime-100 text-lime-900 border-lime-200",
  },
  {
    id: "structured-output",
    section: "Output",
    title: "Structured Output + Zod",
    description:
      "withStructuredOutput(schema) binds a Zod schema to the model. Gemini/OpenAI return typed JSON matching { movies: [...] } — no manual JSON.parse, no regex.",
    code: "model.withStructuredOutput(RecommendationsSchema)",
    flow: "AI text → validated JSON → Movie Cards",
    icon: FileJson,
    accent: "from-orange-500 to-red-500",
    iconBg: "bg-orange-100 text-orange-800",
    badge: "bg-orange-100 text-orange-900 border-orange-200",
  },
];

const SECTIONS = ["Foundation", "Models", "Prompts", "Chains", "Output"];

function ConceptCardItem({
  concept,
  index,
}: {
  concept: ConceptCard;
  index: number;
}) {
  const Icon = concept.icon;

  return (
    <Card
      className={cn(
        "group overflow-hidden border-white/80 bg-white/90 shadow-lg backdrop-blur-sm",
        "transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
        "animate-in fade-in slide-in-from-bottom-4 fill-mode-both",
      )}
      style={{ animationDelay: `${index * 80}ms`, animationDuration: "600ms" }}
    >
      <div className={cn("h-1.5 bg-gradient-to-r", concept.accent)} />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
              concept.iconBg,
            )}
          >
            <Icon className="size-5" />
          </div>
          <Badge variant="outline" className={concept.badge}>
            {concept.section}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-lg text-slate-900">
          {concept.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-slate-600">
          {concept.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {concept.analogy && (
          <p className="rounded-lg bg-violet-50 px-3 py-2 text-xs italic text-violet-700">
            &ldquo;{concept.analogy}&rdquo;
          </p>
        )}
        {concept.flow && (
          <div className="rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-2">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Flow
            </p>
            <p className="font-mono text-xs text-slate-700">{concept.flow}</p>
          </div>
        )}
        {concept.code && (
          <pre className="overflow-x-auto rounded-lg bg-slate-900 px-3 py-2.5 font-mono text-[11px] leading-relaxed text-emerald-300">
            {concept.code}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

export function ConceptsShowcase() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100 via-indigo-50 to-sky-50">
      {/* floating orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 size-64 animate-pulse rounded-full bg-violet-300/30 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 size-72 animate-pulse rounded-full bg-sky-300/25 blur-3xl"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="pointer-events-none absolute bottom-20 left-1/3 size-56 animate-pulse rounded-full bg-amber-200/30 blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm ring-1 ring-violet-200/60 backdrop-blur">
            <Layers className="size-4 text-indigo-500" />
            LangChain JS/TS Crash Course
          </div>
          <h1 className="bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Concepts Showcase
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Every card maps to something we build in the Node.js backend. Use
            this page during your demo to explain the journey from raw LLM text
            to structured movie cards.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className={buttonVariants({
                className:
                  "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700",
              })}
            >
              Live App Demo
              <ArrowRight className="size-4" />
            </Link>
            <Badge
              variant="outline"
              className="border-indigo-200 bg-white/80 px-3 py-1.5 text-indigo-700"
            >
              <Zap className="mr-1 size-3" />
              {CONCEPTS.length} concepts covered
            </Badge>
          </div>
        </header>

        {SECTIONS.map((section) => {
          const items = CONCEPTS.filter((c) => c.section === section);
          if (items.length === 0) return null;

          return (
            <section key={section} className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  {section}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((concept, i) => (
                  <ConceptCardItem
                    key={concept.id}
                    concept={concept}
                    index={i + SECTIONS.indexOf(section) * 2}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* architecture summary card */}
        <Card className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both overflow-hidden border-white/80 bg-gradient-to-br from-white/95 to-violet-50/80 shadow-xl duration-1000">
          <div className="h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
              <Braces className="size-5 text-violet-600" />
              Full App Architecture
            </CardTitle>
            <CardDescription>
              What viewers see in the live demo — separation of concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-xs leading-loose text-slate-300 sm:text-sm">
              {`User
  ↓
Next.js UI (no LangChain — fetch only)
  ↓
POST /api/recommend
  ↓
Express + langchain.service.ts
  ↓
ChatPromptTemplate (system + human)
  ↓
.pipe() → ChatOpenAI or ChatGoogle
  ↓
.withStructuredOutput(Zod schema)
  ↓
{ movies: [...] } JSON
  ↓
Movie cards in UI`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
