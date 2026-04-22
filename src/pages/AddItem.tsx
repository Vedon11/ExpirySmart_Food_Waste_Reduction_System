import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addItem, addManyItems, CATEGORIES } from "@/lib/storage";
import { generateDemoItems } from "@/lib/demo";
import { importCsv } from "@/lib/csv";

const todayIso = () => new Date().toISOString().slice(0, 10);
const plusDays = (d: number) => { const x = new Date(); x.setDate(x.getDate() + d); return x.toISOString().slice(0, 10); };

const AddItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "Fruits",
    quantity: 1,
    purchaseDate: todayIso(),
    expiryDate: plusDays(7),
    notes: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Please enter an item name");
    addItem({
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity) || 1,
      purchaseDate: new Date(form.purchaseDate).toISOString(),
      expiryDate: new Date(form.expiryDate).toISOString(),
      notes: form.notes.trim() || undefined,
    });
    toast.success(`Added "${form.name}" 🌱`);
    navigate("/");
  };

  const handleFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return toast.error("Please upload a .csv file");
    }
    const reader = new FileReader();
    reader.onload = () => {
      const { items, errors } = importCsv(String(reader.result ?? ""));
      if (items.length === 0) return toast.error(errors[0] ?? "No valid rows found");
      addManyItems(items);
      toast.success(`Imported ${items.length} item${items.length !== 1 ? "s" : ""} successfully`);
      if (errors.length) toast.warning(`${errors.length} row${errors.length !== 1 ? "s" : ""} skipped`);
    };
    reader.readAsText(file);
  };

  const handleDemo = () => {
    const demo = generateDemoItems();
    addManyItems(demo);
    toast.success(`Demo data added — ${demo.length} items`);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <header className="flex items-center justify-between gap-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground">Add Item</h1>
          <p className="mt-1 text-muted-foreground">Track a new pantry item, import a CSV, or generate demo data.</p>
        </div>
      </header>

      <form onSubmit={handleSave} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Greek yogurt" className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="purchase">Purchase Date</Label>
            <Input id="purchase" type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="mt-1.5 rounded-xl" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Storage tips, brand, etc." className="mt-1.5 rounded-xl" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" /> Save Item
          </Button>
          <Button type="button" variant="outline" className="rounded-xl" asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>
      </form>

      {/* CSV Import */}
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Import Items from CSV</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Columns: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Item Name, Category, Quantity, Purchase Date, Expiry Date, Notes</code>
            </p>
          </div>
          <Button type="button" onClick={handleDemo} variant="outline" className="rounded-xl">
            <Sparkles className="mr-2 h-4 w-4" /> Generate Demo Data
          </Button>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className={`mt-4 rounded-2xl border-2 border-dashed p-8 text-center transition-smooth ${
            dragOver ? "border-primary bg-primary-soft" : "border-border bg-muted/30"
          }`}
        >
          <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium text-foreground">Drag & drop a .csv file here</p>
          <p className="text-xs text-muted-foreground">or</p>
          <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} className="mt-3 rounded-xl">
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddItem;
