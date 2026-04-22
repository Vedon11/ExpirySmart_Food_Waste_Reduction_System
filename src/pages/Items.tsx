import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Check, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useItems } from "@/hooks/useItems";
import { daysUntil, getStatus, updateItemState, type PantryItem } from "@/lib/storage";
import { StatusBadge } from "@/components/StatusBadge";
import { ItemDetailDialog } from "@/components/ItemDetailDialog";
import { toast } from "sonner";

const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

type Filter = "all" | "active" | "used" | "thrown";

const Items = () => {
  const items = useItems();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("active");
  const [selected, setSelected] = useState<PantryItem | null>(null);

  const filtered = useMemo(() => {
    return items
      .filter((i) => filter === "all" || i.state === filter)
      .filter((i) =>
        q.trim() === ""
          ? true
          : (i.name + " " + i.category + " " + (i.notes ?? "")).toLowerCase().includes(q.toLowerCase())
      )
      .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  }, [items, q, filter]);

  const mark = (e: React.MouseEvent, id: string, state: "used" | "thrown", name: string) => {
    e.stopPropagation();
    updateItemState(id, state);
    toast.success(state === "used" ? `Marked "${name}" as used 🌱` : `Marked "${name}" as thrown`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">Items</h1>
          <p className="mt-1 text-muted-foreground">Browse, search, and manage your pantry</p>
        </div>
        <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/add"><Plus className="mr-2 h-4 w-4" /> Add Item</Link>
        </Button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items, categories, notes..." className="pl-9 rounded-xl bg-card" />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList className="rounded-xl">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
            <TabsTrigger value="thrown">Thrown</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No items found. {items.length === 0 && <Link to="/add" className="text-primary font-medium">Add your first item</Link>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Qty</th>
                  <th className="px-6 py-3 font-medium">Expiry</th>
                  <th className="px-6 py-3 font-medium">Days Left</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((it) => {
                  const d = daysUntil(it.expiryDate);
                  return (
                    <tr key={it.id} onClick={() => setSelected(it)} className="cursor-pointer transition-smooth hover:bg-muted/40">
                      <td className="px-6 py-3 font-medium text-foreground">{it.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{it.category}</td>
                      <td className="px-6 py-3 text-muted-foreground">{it.quantity}</td>
                      <td className="px-6 py-3 text-muted-foreground">{fmt(it.expiryDate)}</td>
                      <td className="px-6 py-3 font-medium text-foreground">
                        {d < 0 ? `${Math.abs(d)}d ago` : d === 0 ? "Today" : `${d}d`}
                      </td>
                      <td className="px-6 py-3">
                        {it.state === "active"
                          ? <StatusBadge status={getStatus(it.expiryDate)} />
                          : <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-muted text-muted-foreground capitalize">{it.state}</span>}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelected(it); }} className="h-8 w-8 p-0 rounded-lg">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {it.state === "active" && (
                            <>
                              <Button size="sm" variant="ghost" onClick={(e) => mark(e, it.id, "used", it.name)} className="h-8 w-8 p-0 rounded-lg text-fresh hover:bg-fresh-soft hover:text-fresh">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={(e) => mark(e, it.id, "thrown", it.name)} className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive-soft hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ItemDetailDialog item={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  );
};

export default Items;
