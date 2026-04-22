import { useEffect, useState } from "react";
import { loadItems, type PantryItem } from "@/lib/storage";

export function useItems() {
  const [items, setItems] = useState<PantryItem[]>(() => loadItems());

  useEffect(() => {
    const refresh = () => setItems(loadItems());
    window.addEventListener("expiry-smart:update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("expiry-smart:update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return items;
}
