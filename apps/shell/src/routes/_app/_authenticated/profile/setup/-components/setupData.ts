// Options for the customer profile setup flow. There is no profile API yet, so choices stay in page state

export type SetupStep = {
  id: string
  label: string
  /** Route of the stage, once it has a screen */
  to?: '/profile/setup' | '/profile/setup/allergies' | '/profile/setup/nutrition' | '/profile/setup/routine' | '/profile/setup/review'
}

/** The five stages of the setup flow */
export const SETUP_STEPS: SetupStep[] = [
  { id: 'dietary', label: 'Dietary Preferences', to: '/profile/setup' },
  { id: 'allergies', label: 'Allergies & Restrictions', to: '/profile/setup/allergies' },
  { id: 'nutrition', label: 'Nutrition & Macros', to: '/profile/setup/nutrition' },
  { id: 'routine', label: 'Meal Routine & Timing', to: '/profile/setup/routine' },
  { id: 'review', label: 'Review & Confirm', to: '/profile/setup/review' },
]

export type DietAccent = 'primary' | 'tertiary'

export type Diet = {
  id: string
  name: string
  description: string
  icon: string
  /** Small tag shown next to the name */
  badge?: string
  accent: DietAccent
  /** What the AI filter flags for this diet, used in the summary banner */
  rule: string
}

export const DIETS: Diet[] = [
  {
    id: 'keto',
    name: 'Keto / Low-Carb',
    description: 'Under 35g net carbs per day, high healthy fats & moderate clean proteins.',
    icon: 'local_fire_department',
    badge: 'Macro Lock',
    accent: 'primary',
    rule: 'more than 35g net carbs',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    description: 'Plant-forward, polyunsaturated olive oils, ancient grains, and fresh wild seafood.',
    icon: 'eco',
    badge: 'Cardio Guard',
    accent: 'tertiary',
    rule: 'refined seed oils or processed red meat',
  },
  {
    id: 'halal',
    name: 'Halal Certified',
    description: 'Strict 100% Halal kitchen sourcing, zero alcohol infusions, certified clean prep.',
    icon: 'verified',
    accent: 'primary',
    rule: 'non-Halal sourcing or alcohol',
  },
  {
    id: 'vegan',
    name: 'Vegan (Plant-Based)',
    description: 'Zero animal products, gelatin, dairy proteins, or animal-derived microbial enzymes.',
    icon: 'psychiatry',
    accent: 'tertiary',
    rule: 'any animal-derived ingredient',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian (Lacto-Ovo)',
    description: 'Meat-free baseline, seamlessly incorporates pasture-raised dairy, yogurt, & eggs.',
    icon: 'egg_alt',
    accent: 'tertiary',
    rule: 'meat, poultry or fish',
  },
  {
    id: 'pescatarian',
    name: 'Pescatarian',
    description: 'Vegetarian foundation enriched with wild-caught fish, sustainable mollusks, & omega-3s.',
    icon: 'set_meal',
    accent: 'primary',
    rule: 'meat or poultry',
  },
  {
    id: 'high-protein',
    name: 'High Protein & Athletic',
    description: 'Engineered for lean mass synthesis; ensures minimum 30g+ bioactive protein per meal.',
    icon: 'fitness_center',
    accent: 'primary',
    rule: 'under 30g protein per meal',
  },
  {
    id: 'low-fodmap',
    name: 'Low-FODMAP',
    description: 'Clinical gut-soothing protocol; eliminates fermentable oligosaccharides & polyols.',
    icon: 'healing',
    accent: 'primary',
    rule: 'high-FODMAP ingredients',
  },
]

export const INITIAL_DIETS = ['keto', 'mediterranean']

export type Organic = 'strict' | 'preferred' | 'neutral'

export const ORGANIC_OPTIONS: { value: Organic; label: string; summary: string }[] = [
  { value: 'strict', label: 'Strict', summary: 'Strictly' },
  { value: 'preferred', label: 'Preferred', summary: 'Preferred' },
  { value: 'neutral', label: 'Neutral', summary: 'No preference' },
]

export const SODIUM_LEVELS = [
  { tick: '<1,500mg', summary: 'Low (<1,500mg)' },
  { tick: 'Moderate', summary: 'Moderate (~2,300mg)' },
  { tick: 'Standard', summary: 'Standard' },
]

export const SPICE_LEVELS = ['Mild / None', 'Medium Heat', 'Spicy Flame', 'Authentic Hot']

export type Constraints = {
  organic: Organic
  /** Index into SODIUM_LEVELS */
  sodium: number
  /** 1-based level into SPICE_LEVELS */
  spice: number
}

export const INITIAL_CONSTRAINTS: Constraints = { organic: 'preferred', sodium: 0, spice: 2 }

// ---------- Stage 2: allergies & restrictions ----------

/** 0 = safe / permitted, 1 = mild, 2 = moderate, 3 = severe */
export type AllergenLevel = 0 | 1 | 2 | 3

export const SEVERITY_LEVELS: Record<Exclude<AllergenLevel, 0>, { label: string; icon: string; status: string }> = {
  3: { label: 'Severe', icon: 'crisis_alert', status: 'Zero Trace Tolerant' },
  2: { label: 'Moderate', icon: 'warning', status: 'Strict Exclusion' },
  1: { label: 'Mild', icon: 'info', status: 'Substitutions OK' },
}

export type AllergenOption = {
  id: string
  name: string
  icon: string
  /** Shown while the allergen is flagged */
  flagged: string
  /** Shown while the allergen is permitted */
  safe: string
}

export const ALLERGENS: AllergenOption[] = [
  {
    id: 'nuts',
    name: 'Peanuts & Tree Nuts',
    icon: 'nutrition',
    flagged: 'Never show or suggest dishes with trace exposures or walnut/almond derivatives.',
    safe: 'Peanuts, almonds, walnuts, and nut butters allowed in recipes.',
  },
  {
    id: 'gluten',
    name: 'Gluten & Wheat',
    icon: 'grain',
    flagged: 'Certified gluten-free options only. Exclude barley, rye, spelt, and conventional semolina.',
    safe: 'Wheat breads, pastas, barley, and rye grains allowed in recipes.',
  },
  {
    id: 'shellfish',
    name: 'Shellfish & Shrimp',
    icon: 'set_meal',
    flagged: 'Exclude shrimp, lobster, crab, and hidden oyster or fish-sauce extracts.',
    safe: 'Shrimp, lobster, crab, and oyster extracts allowed in recipes.',
  },
  {
    id: 'dairy',
    name: 'Dairy & Lactose',
    icon: 'local_cafe',
    flagged: 'Plant milks, ghee, and enzyme-treated low lactose products acceptable.',
    safe: 'Milk, cheese, butter, and cream allowed in recipes.',
  },
  {
    id: 'eggs',
    name: 'Eggs & Albumen',
    icon: 'egg',
    flagged: 'Exclude whole eggs, whites, and baked egg binding components.',
    safe: 'Whole eggs, whites, and baked egg binding components included.',
  },
  {
    id: 'soy',
    name: 'Soy & Edamame',
    icon: 'spa',
    flagged: 'Exclude soy sauce, tofu, tempeh, and isolated soy protein.',
    safe: 'Soy sauce, tofu, tempeh, and isolated soy protein permitted.',
  },
  {
    id: 'fish',
    name: 'Fish & Finfish',
    icon: 'phishing',
    flagged: 'Exclude salmon, tuna, cod, anchovy pastes, and marine oils.',
    safe: 'Wild salmon, tuna, cod, and omega marine oils enabled in meal plans.',
  },
  {
    id: 'sesame',
    name: 'Sesame & Tahini',
    icon: 'scatter_plot',
    flagged: 'Exclude sesame oil, seeds, hummus, and tahini sauces.',
    safe: 'Toasted sesame oil, seeds, hummus, and tahini sauces enabled.',
  },
]

export const INITIAL_ALLERGEN_LEVELS: Record<string, AllergenLevel> = { nuts: 3, gluten: 2, dairy: 1 }

export const INITIAL_CUSTOM_TAGS = ['Cilantro (Soap Gene)', 'Sulfites / Preservatives', 'Shiitake Mushrooms']

export type CrossContact = 'isolation' | 'standard' | 'lifestyle'

export const CROSS_CONTACT_OPTIONS: { value: CrossContact; label: string; description: string; recommended?: boolean }[] = [
  {
    value: 'isolation',
    label: 'Hospital-Grade Isolation',
    description: 'Dedicated sanitized cutting boards, sealed prep containers, and zero airborne nut/flour exposure.',
    recommended: true,
  },
  {
    value: 'standard',
    label: 'Standard Clean Utensil Protocol',
    description: 'Clean pans and utensils between dishes. Micro-trace environmental contact acceptable.',
  },
  {
    value: 'lifestyle',
    label: 'Lifestyle Only (Trace Permitted)',
    description: 'Exclusions based on personal dietary preferences or minor intolerances.',
  },
]

// ---------- Stage 3: nutrition & macros ----------

export type MacroSplit = {
  /** Percent of daily calories; the three always add up to 100 */
  protein: number
  fat: number
  carbs: number
}

export type PresetId = 'fat-loss' | 'hypertrophy' | 'metabolic' | 'dash' | 'custom'

export type Preset = {
  id: PresetId
  label: string
  hint: string
  calories: number
  split: MacroSplit
}

export const PRESETS: Preset[] = [
  { id: 'fat-loss', label: 'Fat Loss & Lean', hint: 'High protein deficit', calories: 1850, split: { protein: 35, fat: 30, carbs: 35 } },
  { id: 'hypertrophy', label: 'Muscle Hypertrophy', hint: 'Anabolic surplus', calories: 2600, split: { protein: 30, fat: 30, carbs: 40 } },
  { id: 'metabolic', label: 'Metabolic Balance', hint: 'Active Maintenance', calories: 2150, split: { protein: 30, fat: 35, carbs: 35 } },
  { id: 'dash', label: 'Heart Health / DASH', hint: 'Cardiovascular priority', calories: 2000, split: { protein: 25, fat: 30, carbs: 45 } },
  { id: 'custom', label: 'Custom Targets', hint: 'User manual input', calories: 2200, split: { protein: 30, fat: 30, carbs: 40 } },
]

export const CALORIE_LIMITS = { min: 1400, max: 3600, step: 25, nudge: 50 }

/** Calories per gram of each macro */
export const KCAL_PER_GRAM: Record<keyof MacroSplit, number> = { protein: 4, fat: 9, carbs: 4 }

export const FOCUS_OPTIONS = [
  { id: 'fiber', label: 'Minimum 35g Dietary Fiber', description: 'Promotes gut microbiome health & steady blood glucose.' },
  { id: 'sugar', label: 'Limit Added Refined Sugars (<20g)', description: 'Flags recipes with syrups, refined table sugars, or nectar.' },
  { id: 'minerals', label: 'Potassium & Magnesium Focus', description: 'Sustains optimal cardiovascular function & nervous recovery.' },
]

export type NutritionTargets = {
  preset: PresetId
  calories: number
  /** Calories of the last preset picked; manual edits keep it, so the optimal range stays put */
  baseline: number
  split: MacroSplit
  /** Ids from FOCUS_OPTIONS */
  focus: string[]
}

const BASE_PRESET = PRESETS[2]

export const INITIAL_NUTRITION: NutritionTargets = {
  preset: BASE_PRESET.id,
  calories: BASE_PRESET.calories,
  baseline: BASE_PRESET.calories,
  split: BASE_PRESET.split,
  focus: FOCUS_OPTIONS.map((option) => option.id),
}

/** How the day's calories are spread across meals (percent) */
export const MEAL_WINDOWS = [
  { id: 'breakfast', label: 'Breakfast', icon: 'wb_twilight', share: 23 },
  { id: 'lunch', label: 'Lunch', icon: 'light_mode', share: 35 },
  { id: 'dinner', label: 'Dinner', icon: 'dark_mode', share: 30 },
  { id: 'snacks', label: 'Snacks / Fuel', icon: 'energy_savings_leaf', share: 12 },
]

export type MealIdea = {
  id: string
  name: string
  meal: string
  kcal: number
  highlight: string
  icon: string
  /** Allergen ids (see ALLERGENS) the dish contains */
  contains: string[]
}

/** Sample dishes; any that contain a flagged allergen are left out */
export const MEAL_IDEAS: MealIdea[] = [
  { id: 'salmon', name: 'Seared Salmon & Asparagus Quinoa', meal: 'Lunch', kcal: 720, highlight: '48g Protein | 32g Good Fats', icon: 'set_meal', contains: ['fish'] },
  { id: 'yogurt', name: 'Greek Yogurt & Omega Walnut Bowl', meal: 'Breakfast', kcal: 480, highlight: '36g Protein | 14g Fiber', icon: 'breakfast_dining', contains: ['dairy', 'nuts'] },
  { id: 'chicken', name: 'Herb Chicken & Broccolini Roast', meal: 'Dinner', kcal: 660, highlight: '52g Protein | Low Added Sugar', icon: 'kebab_dining', contains: ['sesame'] },
  { id: 'lentil', name: 'Lentil & Roasted Veg Power Bowl', meal: 'Lunch', kcal: 610, highlight: '31g Protein | 18g Fiber', icon: 'rice_bowl', contains: [] },
  { id: 'omelette', name: 'Spinach & Feta Egg-White Omelette', meal: 'Breakfast', kcal: 410, highlight: '34g Protein | Low Carb', icon: 'egg_alt', contains: ['eggs', 'dairy'] },
  { id: 'turkey', name: 'Turkey Lettuce Wraps & Avocado', meal: 'Dinner', kcal: 540, highlight: '42g Protein | Low Added Sugar', icon: 'lunch_dining', contains: [] },
]

// ---------- Stage 4: meal routine & timing ----------

export type FastingProtocolId = '16:8' | '14:10' | '18:6' | 'custom'

export const FASTING_PROTOCOLS: { id: FastingProtocolId; label: string; hint: string; feedHours?: number }[] = [
  { id: '16:8', label: '16:8 Leangains', hint: '16h Fast • 8h Feed', feedHours: 8 },
  { id: '14:10', label: '14:10 Gentle', hint: '14h Fast • 10h Feed', feedHours: 10 },
  { id: '18:6', label: '18:6 Extended', hint: '18h Fast • 6h Feed', feedHours: 6 },
  { id: 'custom', label: 'Custom Window', hint: 'Configure freely' },
]

/** Eating-window lengths offered for a custom protocol */
export const CUSTOM_FEED_HOURS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export type SlotOption = { label: string; pack: string }

export type MealSlotId = 'lunch' | 'snack' | 'dinner'

export type MealSlot = {
  id: MealSlotId
  label: string
  description: string
  icon: string
  tone: 'primary' | 'tertiary' | 'secondary'
  /** Minutes the slot lasts, used to check it fits the eating window */
  minutes: number
  /** Share of the day's calories (the three slots add up to 100) */
  share: number
  optionLabel: string
  options: SlotOption[]
}

export const MEAL_SLOTS: MealSlot[] = [
  {
    id: 'lunch',
    label: 'Lunch Window',
    description: 'First caloric intake; optimized for sustained afternoon alertness without insulin spike.',
    icon: 'lunch_dining',
    tone: 'primary',
    minutes: 60,
    share: 45,
    optionLabel: 'Dining Mode',
    options: [
      { label: 'Curbside / Desk Express Delivery', pack: 'Hot Thermo-Lock Pack' },
      { label: 'Dine-In Reserved Partner Table', pack: 'Table Held 15 Min' },
      { label: 'Self-Prep Pre-Portioned Meal', pack: 'Chilled Prep Kit' },
    ],
  },
  {
    id: 'snack',
    label: 'Afternoon Energizer',
    description: 'Precision micro-snack to maintain cognitive stamina and prevent late-day energy dips.',
    icon: 'energy_savings_leaf',
    tone: 'tertiary',
    minutes: 15,
    share: 15,
    optionLabel: 'Nutritional Archetype',
    options: [
      { label: 'High Protein / Zero Crash (25g+)', pack: 'Chilled Ambient Bag' },
      { label: 'Ketogenic Clean Fats', pack: 'Chilled Ambient Bag' },
      { label: 'Cold-Pressed Electrolyte Elixir', pack: '4°C Cryo-Pack' },
    ],
  },
  {
    id: 'dinner',
    label: 'Dinner Window',
    description: 'Final caloric intake with restorative micronutrients supporting overnight cellular recovery.',
    icon: 'soup_kitchen',
    tone: 'secondary',
    minutes: 60,
    share: 40,
    optionLabel: 'Culinary Format',
    options: [
      { label: 'Chef-Prepared Hot Dinner Dispatch', pack: 'Hot Culinary Courier' },
      { label: 'Sous-Vide Fast Finish (10-Min Prep)', pack: 'Sealed Sous-Vide Pouch' },
      { label: 'Artisanal Warm Bowl Curation', pack: 'Insulated Bowl Carrier' },
    ],
  },
]

export type PortionId = 'standard' | 'volume' | 'dense'

export const PORTIONS: { id: PortionId; label: string; description: string; icon: string; satiety: string; best?: boolean }[] = [
  {
    id: 'standard',
    label: 'Standard Balanced',
    description: 'Traditional plate ratios with 40% veggies, 30% complex carbs, and 30% lean proteins with moderate fiber bulk.',
    icon: 'balance',
    satiety: '7.5 / 10',
  },
  {
    id: 'volume',
    label: 'High Volume / Low Density',
    description: 'Maximizes meal mass and fiber with expansive cruciferous greens, hydration-rich veggies, and lean proteins for deep fullness.',
    icon: 'eco',
    satiety: '9.8 / 10 (Max)',
    best: true,
  },
  {
    id: 'dense',
    label: 'Concentrated Energy',
    description: 'Calorically dense, low-bulk meals rich in healthy lipids, nut blends, and compact proteins. Perfect for athletic fueling.',
    icon: 'compress',
    satiety: '6.2 / 10 (Light Gut)',
  },
]

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export type MealRoutine = {
  fasting: boolean
  protocol: FastingProtocolId
  /** Hour of the first bite (0–23) */
  firstBite: number
  /** Length of the eating window in hours */
  feedHours: number
  /** Start time of each slot as "HH:MM" (24h) */
  times: Record<MealSlotId, string>
  /** Index into each slot's options */
  options: Record<MealSlotId, number>
  /** Days a week of prepared deliveries; the rest are home prep */
  deliveryDays: number
  fridgeSync: boolean
  portion: PortionId
}

export const INITIAL_ROUTINE: MealRoutine = {
  fasting: true,
  protocol: '16:8',
  firstBite: 12,
  feedHours: 8,
  times: { lunch: '12:30', snack: '16:00', dinner: '19:00' },
  options: { lunch: 0, snack: 0, dinner: 0 },
  deliveryDays: 5,
  fridgeSync: true,
  portion: 'volume',
}
