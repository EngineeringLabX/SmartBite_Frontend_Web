import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  INITIAL_ALLERGEN_LEVELS,
  INITIAL_CONSTRAINTS,
  INITIAL_CUSTOM_TAGS,
  INITIAL_DIETS,
  INITIAL_NUTRITION,
  INITIAL_ROUTINE,
} from './-components/setupData'
import { SetupContext, type SetupValues } from './-components/setupState'

// Layout for every setup stage: holds the choices so moving between stages keeps them
export const Route = createFileRoute('/_app/_authenticated/profile/setup')({
  component: SetupLayout,
})

function SetupLayout() {
  const [values, setValues] = useState<SetupValues>({
    diets: INITIAL_DIETS,
    constraints: INITIAL_CONSTRAINTS,
    allergens: INITIAL_ALLERGEN_LEVELS,
    customTags: INITIAL_CUSTOM_TAGS,
    crossContact: 'isolation',
    epiPen: true,
    nutrition: INITIAL_NUTRITION,
    routine: INITIAL_ROUTINE,
  })
  const state = useMemo(() => ({ ...values, update: setValues }), [values])

  return (
    <SetupContext.Provider value={state}>
      <Outlet />
    </SetupContext.Provider>
  )
}
