import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Icon } from '../../-components/Icon'
import { SetupShell } from '../-components/SetupShell'
import {
  DIETS,
  INITIAL_NUTRITION,
  PRESETS,
  SETUP_STEPS,
  type NutritionTargets,
  type Preset,
} from '../-components/setupData'
import { useSetup } from '../-components/setupState'
import setup from '../setup.module.css'
import { CalorieTarget } from './-components/CalorieTarget'
import { ClinicalFocus } from './-components/ClinicalFocus'
import { EnergyBreakdown } from './-components/EnergyBreakdown'
import { MacroDistribution } from './-components/MacroDistribution'
import { MealIdeas, MealSplit } from './-components/MealPlanPreview'
import { gramsOf, KETO_CARB_CAP, KETO_SPLIT } from './-components/nutritionMath'
import styles from './nutrition.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/setup/nutrition/')({
  component: NutritionSetup,
})

// Stage 3 of the customer profile setup
const STEP = 2

function NutritionSetup() {
  const { diets, allergens, nutrition, update } = useSetup()
  const [draftSaved, setDraftSaved] = useState(false)

  useEffect(() => {
    if (!draftSaved) return
    const timer = setTimeout(() => setDraftSaved(false), 2500)
    return () => clearTimeout(timer)
  }, [draftSaved])

  const setNutrition = (patch: Partial<NutritionTargets>) =>
    update((current) => ({ ...current, nutrition: { ...current.nutrition, ...patch } }))

  const pickPreset = (preset: Preset) =>
    setNutrition({ preset: preset.id, calories: preset.calories, baseline: preset.calories, split: preset.split })

  const { calories, baseline, split } = nutrition
  const flagged = Object.keys(allergens).filter((id) => allergens[id] > 0)
  const dietNames = DIETS.filter((diet) => diets.includes(diet.id)).map((diet) => diet.name)
  const carbGrams = gramsOf(calories, split.carbs, 'carbs')
  const ketoConflict = diets.includes('keto') && carbGrams > KETO_CARB_CAP

  return (
    <SetupShell currentStep={STEP}>
      <div className={setup.card}>
        <div className={styles.phase}>
          <span className={styles.phaseText}>
            <strong>
              Phase {String(STEP + 1).padStart(2, '0')} of {String(SETUP_STEPS.length).padStart(2, '0')}
            </strong>
            <span className={styles.phaseDot} />
            Metabolic Calibration
          </span>
          <span className={styles.aiChip}>
            <Icon name="bolt" size={14} />
            AI Calculated Baseline
          </span>
        </div>

        <div className={setup.intro}>
          <div>
            <span className={styles.eyebrow}>
              <Icon name="tune" size={20} />
              Precision Bio-Fueling
            </span>
            <h1 className={setup.title}>Set Your Daily Nutrition &amp; Macro Targets</h1>
            <p className={setup.lead}>
              SmartBite AI auto-calculates dish portions and suggests balancing meals across your day.
            </p>
          </div>
          <span className={styles.modelChip}>
            <Icon name="verified" size={18} className={styles.primaryText} />
            TDEE Model: Katch-McArdle v2.4
          </span>
        </div>

        <section className={styles.presets} aria-labelledby="presets-title">
          <div className={styles.panelHead}>
            <h2 id="presets-title" className={styles.presetsTitle}>
              Goal Presets &amp; Clinical Protocols
            </h2>
            <button
              type="button"
              className={styles.reset}
              onClick={() => setNutrition({ ...INITIAL_NUTRITION, focus: nutrition.focus })}
            >
              <Icon name="refresh" size={14} />
              Reset to Base
            </button>
          </div>
          <div className={styles.presetGrid}>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                aria-pressed={nutrition.preset === preset.id}
                className={`${styles.preset} ${nutrition.preset === preset.id ? styles.presetOn : ''}`}
                onClick={() => pickPreset(preset)}
              >
                <strong>{preset.label}</strong>
                <span>{preset.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.bento}>
          <div className={styles.stack}>
            <CalorieTarget
              calories={calories}
              baseline={baseline}
              onChange={(value) => setNutrition({ calories: value, preset: 'custom' })}
            />
            <MacroDistribution
              calories={calories}
              split={split}
              onChange={(value) => setNutrition({ split: value, preset: 'custom' })}
            />
          </div>
          <div className={styles.stack}>
            <EnergyBreakdown calories={calories} baseline={baseline} split={split} />
            <ClinicalFocus selected={nutrition.focus} onChange={(focus) => setNutrition({ focus })} />
          </div>
        </div>

        <MealSplit calories={calories} split={split} />

        <div className={`${styles.tip} ${ketoConflict ? styles.tipWarning : ''}`}>
          <span className={styles.tipIcon}>
            <Icon name={ketoConflict ? 'warning' : 'smart_toy'} size={20} />
          </span>
          <div>
            <div className={styles.tipHead}>
              <strong>SmartBite Nutrition Intelligence</strong>
              <span>{ketoConflict ? 'Conflict Detected' : 'Personalized'}</span>
            </div>
            <p>
              {ketoConflict ? (
                <>
                  Your <strong>Keto / Low-Carb</strong> framework from Step 1 caps net carbs at {KETO_CARB_CAP}g a day,
                  but this split allows <strong>{carbGrams}g</strong>. Switch to a ketogenic split, or revisit your
                  dietary paths, so suggested meals don't break your carb envelope.
                </>
              ) : dietNames.length ? (
                <>
                  Based on your <strong>{dietNames.join(' / ')}</strong> preferences configured in Step 1, we recommend
                  prioritizing omega-3 fatty acids (salmon, chia seed, cold-pressed olive oils) and lean organic proteins
                  to naturally optimize satiety while avoiding glucose spikes.
                </>
              ) : (
                'Pick a dietary path in Step 1 and SmartBite AI will tailor these targets to it. Until then, a balanced split of lean proteins, healthy fats and complex carbs keeps energy steady through the day.'
              )}
            </p>
            {ketoConflict && (
              <button
                type="button"
                className={styles.tipAction}
                onClick={() => setNutrition({ split: KETO_SPLIT, preset: 'custom' })}
              >
                Apply Keto-safe split ({KETO_SPLIT.protein}/{KETO_SPLIT.fat}/{KETO_SPLIT.carbs})
              </button>
            )}
          </div>
        </div>

        <MealIdeas flagged={flagged} />

        <div className={setup.actions}>
          <Link to="/profile/setup/allergies" className={styles.back}>
            <Icon name="arrow_back" size={18} />
            Back to Allergies
          </Link>
          <div className={styles.forward}>
            <button type="button" className={styles.draft} onClick={() => setDraftSaved(true)}>
              {draftSaved ? (
                <>
                  <Icon name="check" size={16} className={styles.tertiaryText} />
                  Draft Saved
                </>
              ) : (
                'Save Draft'
              )}
            </button>
            <Link to="/profile/setup/routine" className={setup.continue}>
              Continue to Meal Routine
              <Icon name="arrow_forward" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </SetupShell>
  )
}
