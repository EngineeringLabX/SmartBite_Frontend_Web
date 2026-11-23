import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import type { AllergenLevel, Constraints, CrossContact, MealRoutine, NutritionTargets } from './setupData'

/** Everything chosen across the setup stages. Kept in memory until there is a profile API */
export type SetupValues = {
  diets: string[]
  constraints: Constraints
  allergens: Record<string, AllergenLevel>
  customTags: string[]
  crossContact: CrossContact
  epiPen: boolean
  nutrition: NutritionTargets
  routine: MealRoutine
}

export type SetupState = SetupValues & {
  update: Dispatch<SetStateAction<SetupValues>>
}

export const SetupContext = createContext<SetupState | null>(null)

/** Setup choices shared by every stage (provided by the setup layout route) */
export function useSetup() {
  const state = useContext(SetupContext)
  if (!state) throw new Error('useSetup must be used inside the profile setup route')
  return state
}
