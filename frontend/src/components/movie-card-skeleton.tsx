import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <Card className="border-white/80 bg-white/90 shadow-md dark:border-slate-800/80 dark:bg-slate-900/90">
      <Skeleton className="h-1.5 w-full rounded-none bg-violet-200 dark:bg-violet-950" />
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-3/4 bg-violet-100 dark:bg-violet-900/40" />
        <Skeleton className="h-4 w-1/4 bg-slate-100 dark:bg-slate-850" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full bg-sky-100 dark:bg-sky-950/40" />
          <Skeleton className="h-5 w-20 rounded-full bg-amber-100 dark:bg-amber-950/40" />
        </div>
        <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-850" />
        <Skeleton className="h-16 w-full rounded-lg bg-violet-50 dark:bg-slate-950/80" />
      </CardContent>
    </Card>
  );
}
