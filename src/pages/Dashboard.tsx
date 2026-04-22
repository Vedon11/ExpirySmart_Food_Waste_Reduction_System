import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Leaf, Clock, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/useItems";
import { getStatus } from "@/lib/storage";
import { StatCard } from "@/components/StatCard";
import { FreshnessChart } from "@/components/FreshnessChart";
import { UpNextTable } from "@/components/UpNextTable";
import { ImpactCard } from "@/components/ImpactCard";
import { generateDemoItems } from "@/lib/demo";
import { addManyItems } from "@/lib/storage";
import { toast } from "sonner";

const Dashboard = () => {
  const items = useItems();

  const counts = useMemo(() => {
    const active = items.filter((i) => i.state === "active");
    let fresh = 0, expiring = 0, expired = 0;
    active.forEach((i) => {
      const s = getStatus(i.expiryDate);
      if (s === "fresh") fresh++;
      else if (s === "expiring") expiring++;
      else expired++;
    });
    return { fresh, expiring, expired };
  }, [items]);

  const handleDemo = () => {
    const demo = generateDemoItems();
    addManyItems(demo);
    toast.success(`Demo data added — ${demo.length} items`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Your pantry, at a glance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.length === 0 && (
            <Button onClick={handleDemo} variant="outline" className="rounded-xl">
              <Sparkles className="mr-2 h-4 w-4" /> Generate Demo Data
            </Button>
          )}
          <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft">
            <Link to="/add"><Plus className="mr-2 h-4 w-4" /> Add New Item</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Fresh Items" value={counts.fresh} icon={Leaf} tone="fresh" hint="Plenty of time" />
        <StatCard label="Expiring Soon" value={counts.expiring} icon={Clock} tone="warning" hint="Within 5 days" />
        <StatCard label="Expired Items" value={counts.expired} icon={AlertTriangle} tone="destructive" hint="Past expiry" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <FreshnessChart fresh={counts.fresh} expiring={counts.expiring} expired={counts.expired} />
        </div>
        <div className="lg:col-span-3">
          <ImpactCard items={items} />
        </div>
      </div>

      <UpNextTable items={items} />
    </div>
  );
};

export default Dashboard;
