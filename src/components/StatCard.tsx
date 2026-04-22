import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone: "fresh" | "warning" | "destructive";
  hint?: string;
}

const toneMap = {
  fresh: { bg: "bg-fresh-soft", text: "text-fresh", ring: "ring-fresh/20" },
  warning: { bg: "bg-warning-soft", text: "text-warning", ring: "ring-warning/20" },
  destructive: { bg: "bg-destructive-soft", text: "text-destructive", ring: "ring-destructive/20" },
};

export const StatCard = ({ label, value, icon: Icon, tone, hint }: Props) => {
  const t = toneMap[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl ring-1", t.bg, t.ring)}>
          <Icon className={cn("h-5 w-5", t.text)} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
};
