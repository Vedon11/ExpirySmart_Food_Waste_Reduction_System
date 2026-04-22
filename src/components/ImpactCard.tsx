import { useMemo, useState } from "react";
import { Leaf, Share2, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { PantryItem } from "@/lib/storage";
import { daysUntil } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Range = "week" | "month" | "all";

function inRange(iso: string, range: Range) {
  if (range === "all") return true;
  const days = (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
  return range === "week" ? days <= 7 : days <= 31;
}

export const ImpactCard = ({ items }: { items: PantryItem[] }) => {
  const [copied, setCopied] = useState(false);
  const [range, setRange] = useState<Range>("all");

  const stats = useMemo(() => {
    const filtered = items.filter((i) => inRange(i.createdAt, range));
    const saved = filtered.filter((i) => i.state === "used").length;
    const wasted = filtered.filter((i) => i.state === "thrown").length;
    const total = saved + wasted;
    const rate = total === 0 ? 0 : Math.round((saved / total) * 100);
    const atRisk = items.filter((i) => i.state === "active" && daysUntil(i.expiryDate) <= 5 && daysUntil(i.expiryDate) >= 0).length;
    return { saved, wasted, rate, atRisk };
  }, [items, range]);

  const shareText = `I saved ${stats.saved} food items and reduced waste by ${stats.rate}% using Expiry Smart 🌱`;

  const handleShare = async () => {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = shareText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        fallback();
      }
    } catch {
      fallback();
    }
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-fresh/20 bg-gradient-impact p-6 shadow-card animate-fade-in">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fresh/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Your Sustainability Impact</h3>
            <p className="text-sm text-muted-foreground">Every item saved is a small win for the planet</p>
          </div>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList className="bg-background/60 backdrop-blur">
            <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
            <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-3">
        <Metric label="Saved" value={stats.saved} accent />
        <Metric label="Wasted" value={stats.wasted} />
        <Metric label="Reduction" value={`${stats.rate}%`} accent big />
      </div>

      {stats.atRisk > 0 && (
        <div className="relative mt-4 flex items-center gap-2 rounded-xl bg-warning-soft px-3 py-2 text-sm text-warning border border-warning/20">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">{stats.atRisk} item{stats.atRisk !== 1 && "s"} at risk</span>
          <span className="text-warning/80">— use them soon to boost your impact.</span>
        </div>
      )}

      <p className="relative mt-4 italic text-sm text-foreground/80 font-display">
        "I saved <span className="text-fresh font-semibold not-italic">{stats.saved}</span> food items and reduced waste by <span className="text-fresh font-semibold not-italic">{stats.rate}%</span> using Expiry Smart 🌱"
      </p>

      <div className="relative mt-5">
        <Button
          onClick={handleShare}
          className={cn(
            "rounded-xl transition-smooth",
            copied
              ? "bg-fresh text-fresh-foreground hover:bg-fresh/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {copied ? (
            <><Check className="mr-2 h-4 w-4" /> Copied</>
          ) : (
            <><Share2 className="mr-2 h-4 w-4" /> Share Impact</>
          )}
        </Button>
      </div>
    </div>
  );
};

const Metric = ({ label, value, accent, big }: { label: string; value: number | string; accent?: boolean; big?: boolean }) => (
  <div className="rounded-xl bg-background/70 backdrop-blur px-4 py-3 border border-border/40">
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={cn(
      "font-display font-semibold tracking-tight mt-1",
      big ? "text-3xl" : "text-2xl",
      accent ? "text-fresh" : "text-foreground"
    )}>{value}</p>
  </div>
);
