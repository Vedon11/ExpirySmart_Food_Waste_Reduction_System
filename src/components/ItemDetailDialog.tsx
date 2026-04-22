import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Trash2, ChefHat, Lightbulb } from "lucide-react";
import { CATEGORY_TIPS } from "@/lib/tips";
import { daysUntil, getStatus, updateItemState, type PantryItem } from "@/lib/storage";
import { StatusBadge } from "./StatusBadge";
import { toast } from "sonner";

interface Props {
  item: PantryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ItemDetailDialog = ({ item, open, onOpenChange }: Props) => {
  if (!item) return null;
  const tips = CATEGORY_TIPS[item.category] ?? CATEGORY_TIPS.Other;
  const d = daysUntil(item.expiryDate);

  const mark = (state: "used" | "thrown") => {
    updateItemState(item.id, state);
    toast.success(state === "used" ? `Marked "${item.name}" as used 🌱` : `Marked "${item.name}" as thrown`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="font-display text-2xl">{item.name}</DialogTitle>
            <StatusBadge status={getStatus(item.expiryDate)} />
          </div>
          <DialogDescription>
            {item.category} · Qty {item.quantity} · {d < 0 ? `Expired ${Math.abs(d)}d ago` : d === 0 ? "Expires today" : `${d} days left`}
          </DialogDescription>
        </DialogHeader>

        {item.notes && (
          <div className="rounded-xl bg-muted/60 px-3 py-2 text-sm text-muted-foreground">{item.notes}</div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Lightbulb className="h-4 w-4 text-warning" /> Storage Tips
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {tips.tips.map((t, i) => <li key={i} className="flex gap-2"><span className="text-fresh">•</span>{t}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <ChefHat className="h-4 w-4 text-primary" /> Recipe Ideas
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {tips.recipes.map((r, i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{r}</li>)}
            </ul>
          </div>
        </div>

        {item.state === "active" ? (
          <div className="flex gap-2 pt-2">
            <Button onClick={() => mark("used")} className="flex-1 rounded-xl bg-fresh text-fresh-foreground hover:bg-fresh/90">
              <Check className="mr-2 h-4 w-4" /> Mark Used
            </Button>
            <Button onClick={() => mark("thrown")} variant="outline" className="flex-1 rounded-xl border-destructive/30 text-destructive hover:bg-destructive-soft hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Mark Thrown
            </Button>
          </div>
        ) : (
          <div className="rounded-xl bg-muted/60 px-3 py-2 text-center text-sm text-muted-foreground capitalize">
            Already marked as {item.state}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
