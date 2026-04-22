import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { daysUntil, getStatus, type PantryItem } from "@/lib/storage";
import { StatusBadge } from "./StatusBadge";

const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export const UpNextTable = ({ items }: { items: PantryItem[] }) => {
  const top = [...items]
    .filter((i) => i.state === "active")
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Up Next to Use</h3>
          <p className="text-sm text-muted-foreground">Closest to expiring</p>
        </div>
        <Link to="/items" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-glow transition-smooth">
          All items <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {top.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          No active items. Add one or generate demo data to get started.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Expiry</th>
                <th className="pb-3 font-medium">Days Left</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {top.map((it) => {
                const d = daysUntil(it.expiryDate);
                return (
                  <tr key={it.id} className="transition-smooth hover:bg-muted/40">
                    <td className="py-3 font-medium text-foreground">{it.name}</td>
                    <td className="py-3 text-muted-foreground">{it.category}</td>
                    <td className="py-3 text-muted-foreground">{fmt(it.expiryDate)}</td>
                    <td className="py-3 text-foreground font-medium">
                      {d < 0 ? `${Math.abs(d)}d ago` : d === 0 ? "Today" : `${d}d`}
                    </td>
                    <td className="py-3"><StatusBadge status={getStatus(it.expiryDate)} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
