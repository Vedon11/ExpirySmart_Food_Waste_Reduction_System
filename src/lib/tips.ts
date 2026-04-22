export const CATEGORY_TIPS: Record<string, { tips: string[]; recipes: string[] }> = {
  Fruits: {
    tips: ["Store ripening fruits away from veggies (ethylene gas).", "Refrigerate berries unwashed in a paper-towel-lined container.", "Freeze overripe bananas for smoothies."],
    recipes: ["Fruit salad with honey-lime dressing", "Banana oat pancakes", "Berry smoothie bowl"],
  },
  Vegetables: {
    tips: ["Wrap leafy greens in a paper towel before refrigerating.", "Keep tomatoes at room temperature for best flavor.", "Blanch and freeze veggies before they spoil."],
    recipes: ["Roasted veggie sheet pan", "Quick stir-fry with garlic & soy", "Hearty vegetable soup"],
  },
  Dairy: {
    tips: ["Store milk on a shelf, not the door (more stable temperature).", "Keep cheese wrapped in parchment, then loose plastic.", "Freeze yogurt into popsicles before it expires."],
    recipes: ["Greek yogurt parfait", "Cheesy baked pasta", "Homemade salad dressing"],
  },
  Snacks: {
    tips: ["Reseal tightly to keep crisp.", "Store nuts in the fridge to extend shelf life.", "Use stale crackers as breading."],
    recipes: ["Trail mix energy balls", "Crushed-chip-crusted chicken", "Chocolate bark with nuts"],
  },
  Frozen: {
    tips: ["Label with date frozen.", "Don't refreeze thawed items.", "Use within 3 months for best quality."],
    recipes: ["Smoothie with frozen fruit", "Quick frozen veggie fried rice", "Berry crumble"],
  },
  Other: {
    tips: ["Store bread in a cool dry place; freeze extras.", "Keep eggs in the carton on a fridge shelf.", "Use airtight containers to extend freshness."],
    recipes: ["French toast", "Veggie omelette", "Toast with hummus & tomato"],
  },
};
