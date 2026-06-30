import { Film, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/types/movie";

const ACCENT_BARS = [
  "from-violet-500 to-indigo-500",
  "from-sky-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
];

const GENRE_COLORS = [
  "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900/50",
  "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/50",
  "bg-amber-100 text-amber-850 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
  "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50",
];

type MovieCardProps = {
  movie: Movie;
  index: number;
};

export function MovieCard({ movie, index }: MovieCardProps) {
  const accent = ACCENT_BARS[index % ACCENT_BARS.length];

  return (
    <Card className="overflow-hidden border-white/80 bg-white/90 shadow-lg shadow-indigo-100/60 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/50 dark:border-slate-800/80 dark:bg-slate-900/90 dark:shadow-none">
      <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {movie.title}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Film className="size-3.5" />
              {movie.year}
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/50">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {movie.rating.toFixed(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {movie.genre.map((g, i) => (
            <Badge
              key={g}
              variant="outline"
              className={GENRE_COLORS[i % GENRE_COLORS.length]}
            >
              {g}
            </Badge>
          ))}
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-350">
          <Users className="mt-0.5 size-4 shrink-0 text-violet-500 dark:text-violet-400" />
          <p>{movie.cast.join(" · ")}</p>
        </div>
        <div className={`rounded-lg bg-gradient-to-br ${accent} p-px`}>
          <div className="rounded-[7px] bg-violet-50/80 px-3 py-2.5 dark:bg-slate-950/85">
            <p className="text-xs font-medium uppercase tracking-wide text-violet-600 dark:text-violet-400">
              Why this matches you
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {movie.reason}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
