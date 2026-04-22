import { v4 as uuidv4 } from "uuid";
import type { PantryItem } from "./storage";

// Minimal CSV parser supporting quoted fields with commas
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let val = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { val += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { val += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { cur.push(val); val = ""; }
      else if (c === "\n" || c === "\r") {
        if (val.length || cur.length) { cur.push(val); rows.push(cur); cur = []; val = ""; }
        if (c === "\r" && text[i + 1] === "\n") i++;
      } else { val += c; }
    }
  }
  if (val.length || cur.length) { cur.push(val); rows.push(cur); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

export interface CsvImportResult {
  items: PantryItem[];
  errors: string[];
}

export function importCsv(text: string): CsvImportResult {
  const rows = parseCsv(text);
  const errors: string[] = [];
  if (rows.length === 0) return { items: [], errors: ["File is empty"] };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = {
    name: header.indexOf("item name"),
    category: header.indexOf("category"),
    quantity: header.indexOf("quantity"),
    purchase: header.indexOf("purchase date"),
    expiry: header.indexOf("expiry date"),
    notes: header.indexOf("notes"),
  };

  if (idx.name < 0 || idx.expiry < 0) {
    return { items: [], errors: ["CSV must include 'Item Name' and 'Expiry Date' columns"] };
  }

  const items: PantryItem[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = row[idx.name]?.trim();
    const expiry = row[idx.expiry]?.trim();
    if (!name || !expiry) { errors.push(`Row ${r + 1}: missing name or expiry`); continue; }
    const expiryDate = new Date(expiry);
    if (isNaN(expiryDate.getTime())) { errors.push(`Row ${r + 1}: invalid expiry date`); continue; }
    const purchaseRaw = idx.purchase >= 0 ? row[idx.purchase]?.trim() : "";
    const purchaseDate = purchaseRaw ? new Date(purchaseRaw) : new Date();
    const qtyRaw = idx.quantity >= 0 ? row[idx.quantity]?.trim() : "1";
    const quantity = Number(qtyRaw) || 1;
    items.push({
      id: uuidv4(),
      name,
      category: (idx.category >= 0 ? row[idx.category]?.trim() : "") || "Other",
      quantity,
      purchaseDate: purchaseDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      createdAt: new Date().toISOString(),
      state: "active",
      notes: idx.notes >= 0 ? row[idx.notes]?.trim() : undefined,
    });
  }
  return { items, errors };
}
