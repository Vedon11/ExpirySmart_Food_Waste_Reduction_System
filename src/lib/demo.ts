import { v4 as uuidv4 } from "uuid";
import type { PantryItem, ItemState } from "./storage";

const POOL: { name: string; category: string }[] = [
  { name: "Banana", category: "Fruits" },
  { name: "Apple", category: "Fruits" },
  { name: "Strawberries", category: "Fruits" },
  { name: "Blueberries", category: "Fruits" },
  { name: "Avocado", category: "Fruits" },
  { name: "Spinach", category: "Vegetables" },
  { name: "Tomato", category: "Vegetables" },
  { name: "Carrots", category: "Vegetables" },
  { name: "Bell Pepper", category: "Vegetables" },
  { name: "Cucumber", category: "Vegetables" },
  { name: "Greek Yogurt", category: "Dairy" },
  { name: "Whole Milk", category: "Dairy" },
  { name: "Cheddar Cheese", category: "Dairy" },
  { name: "Butter", category: "Dairy" },
  { name: "Cottage Cheese", category: "Dairy" },
  { name: "Tortilla Chips", category: "Snacks" },
  { name: "Granola Bars", category: "Snacks" },
  { name: "Dark Chocolate", category: "Snacks" },
  { name: "Mixed Nuts", category: "Snacks" },
  { name: "Frozen Berries", category: "Frozen" },
  { name: "Frozen Peas", category: "Frozen" },
  { name: "Ice Cream", category: "Frozen" },
  { name: "Frozen Pizza", category: "Frozen" },
  { name: "Sourdough Bread", category: "Other" },
  { name: "Eggs", category: "Other" },
  { name: "Hummus", category: "Other" },
];

const STATES: ItemState[] = ["active", "active", "active", "active", "used", "used", "thrown"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function generateDemoItems(count = rand(15, 25)): PantryItem[] {
  const picks = shuffled(POOL).slice(0, Math.min(count, POOL.length));
  const now = new Date();
  return picks.map((p) => {
    const purchase = new Date(now);
    purchase.setDate(purchase.getDate() - rand(0, 7));
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + rand(-2, 12));
    return {
      id: uuidv4(),
      name: p.name,
      category: p.category,
      quantity: rand(1, 10),
      purchaseDate: purchase.toISOString(),
      expiryDate: expiry.toISOString(),
      createdAt: new Date().toISOString(),
      state: STATES[rand(0, STATES.length - 1)],
    };
  });
}
