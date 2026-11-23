import { CALORIE_LIMITS, KCAL_PER_GRAM, type MacroSplit } from '../../-components/setupData'

export const MACROS: { key: keyof MacroSplit; label: string; note: string }[] = [
  { key: 'protein', label: 'Protein', note: 'Lean mass' },
  { key: 'fat', label: 'Fats', note: 'Healthy lipids' },
  { key: 'carbs', label: 'Net Carbs', note: 'Complex index' },
]

/** Grams of a macro for a share of the day's calories */
export const gramsOf = (calories: number, percent: number, macro: keyof MacroSplit) =>
  Math.round((calories * percent) / 100 / KCAL_PER_GRAM[macro])

export const clampCalories = (value: number) => Math.min(CALORIE_LIMITS.max, Math.max(CALORIE_LIMITS.min, value))

export const formatNumber = (value: number) => value.toLocaleString('en-US')

/** Smallest share protein and fat may have */
const MIN_SHARE = 10
/** Carbs may go lower so ketogenic splits are possible */
const MIN_CARB_SHARE = 5

/** Net-carb cap per day of the Keto framework from stage 1 */
export const KETO_CARB_CAP = 35

/** Ketogenic split: high fat, moderate protein, minimal carbs */
export const KETO_SPLIT = { protein: 25, fat: 70, carbs: 5 }

/**
 * Moves protein or fat by `delta` percent and lets carbs take up the rest,
 * so the split always adds up to 100%. Returns null when the change is out of range.
 */
export function adjustSplit(split: MacroSplit, macro: 'protein' | 'fat', delta: number): MacroSplit | null {
  const next = { ...split, [macro]: split[macro] + delta }
  next.carbs = 100 - next.protein - next.fat
  if (next.protein < MIN_SHARE || next.fat < MIN_SHARE || next.carbs < MIN_CARB_SHARE) return null
  return next
}
