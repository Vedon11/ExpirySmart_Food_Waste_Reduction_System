import { v4 as uuidv4 } from "uuid";

export type ItemState = "active" | "used" | "thrown";

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  purchaseDate: string; // ISO
  expiryDate: string; // ISO
  createdAt: string; // ISO
  state: ItemState;
  notes?: string;
}

export const STORAGE_KEY = "expiry_smart_items_v1";

export const CATEGORIES = ["Fruits", "Vegetables", "Dairy", "Snacks", "Frozen", "Other"] as const;

export function loadItems(): PantryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveItems(items: PantryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("expiry-smart:update"));
}

export function addItem(item: Omit<PantryItem, "id" | "createdAt" | "state"> & { state?: ItemState }) {
  const items = loadItems();
  const newItem: PantryItem = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    state: item.state ?? "active",
    ...item,
  };
  saveItems([newItem, ...items]);
  return newItem;
}

export function addManyItems(newItems: PantryItem[]) {
  const items = loadItems();
  saveItems([...newItems, ...items]);
}

export function updateItemState(id: string, state: ItemState) {
  const items = loadItems().map((i) => (i.id === id ? { ...i, state } : i));
  saveItems(items);
}

export function deleteItem(id: string) {
  saveItems(loadItems().filter((i) => i.id !== id));
}

export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export type FreshnessStatus = "fresh" | "expiring" | "expired";

export function getStatus(iso: string): FreshnessStatus {
  const d = daysUntil(iso);
  if (d < 1) return "expired";
  if (d <= 5) return "expiring";
  return "fresh";
}
