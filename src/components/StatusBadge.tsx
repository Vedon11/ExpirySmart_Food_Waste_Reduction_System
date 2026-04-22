import { cn } from "@/lib/utils";
import type { FreshnessStatus } from "@/lib/storage";

const styles: Record<FreshnessStatus, string> = {
  fresh: "bg-fresh-soft text-fresh border border-fresh/20",
  expiring: "bg-warning-soft text-warning border border-warning/30",
  expired: "bg-destructive-soft text-destructive border border-destructive/20",
};

const labels: Record<FreshnessStatus, string> = {
  fresh: "Fresh",
  expiring: "Expiring",
  expired: "Expired",
};

export const StatusBadge = ({ status }: { status: FreshnessStatus }) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", styles[status])}>
    <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", {
      "bg-fresh": status === "fresh",
      "bg-warning": status === "expiring",
      "bg-destructive": status === "expired",
    })} />
    {labels[status]}
  </span>
);
