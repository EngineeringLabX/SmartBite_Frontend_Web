import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Icon } from '../../-components/Icon'
import { SetupShell } from '../-components/SetupShell'
import { SETUP_STEPS, type MealRoutine } from '../-components/setupData'
import { useSetup } from '../-components/setupState'
import setup from '../setup.module.css'
import { CulinaryCadence } from './-components/CulinaryCadence'
import { FastingWindow } from './-components/FastingWindow'
import { MealSchedule } from './-components/MealSchedule'
import { PortionArchetype } from './-components/PortionArchetype'
import styles from './routine.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/setup/routine/')({
  component: RoutineSetup,
})

// Stage 4 of the customer profile setup
const STEP = 3

const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

function RoutineSetup() {
  const { routine, nutrition, update } = useSetup()
  // Choices are kept in memory across the setup stages; this records when they last changed
  const [savedAt, setSavedAt] = useState(() => new Date())
  const [draftFlash, setDraftFlash] = useState(false)

  useEffect(() => {
    if (!draftFlash) return
    const timer = setTimeout(() => setDraftFlash(false), 2500)
    return () => clearTimeout(timer)
  }, [draftFlash])

  const setRoutine = (patch: Partial<MealRoutine>) => {
    update((current) => ({ ...current, routine: { ...current.routine, ...patch } }))
    setSavedAt(new Date())
  }

  return (
    <SetupShell currentStep={STEP}>
      <div className={setup.card}>
        <div className={styles.phase}>
          <span className={styles.phaseText}>
            <span className={styles.stepChip}>
              <Icon name="schedule" size={14} />
              Step {String(STEP + 1).padStart(2, '0')} of {String(SETUP_STEPS.length).padStart(2, '0')}
            </span>
            <span className={styles.engine}>• Culinary Chronobiology Engine</span>
          </span>
          <span className={styles.autoSave}>
            <Icon name="sync_saved_locally" size={15} filled />
            Draft auto-saved at {formatTime(savedAt)}
          </span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>
              <Icon name="restaurant_menu" size={18} />
              Metabolic Circadian Synchronization
            </span>
            <h1 className={setup.title}>Meal Routine, Dining Schedule &amp; Prep Preferences</h1>
            <p>
              Configure when you eat so SmartBite AI can schedule hot deliveries, chef preps, and optimal nutrient
              timing around your metabolic peak.
            </p>
          </div>
          <Icon name="timer" size={210} className={styles.heroMark} />
        </div>

        <FastingWindow routine={routine} onChange={setRoutine} />
        <MealSchedule routine={routine} calories={nutrition.calories} onChange={setRoutine} />
        <CulinaryCadence routine={routine} onChange={setRoutine} />
        <PortionArchetype value={routine.portion} onChange={(portion) => setRoutine({ portion })} />

        <section className={styles.dispatch}>
          <div className={styles.dispatchArt}>
            <Icon name="delivery_dining" size={80} />
          </div>
          <div className={styles.dispatchText}>
            <span className={styles.dispatchOverline}>
              <Icon name="verified" size={16} />
              Fulfillment Precision Guaranteed
            </span>
            <h2>Courier Smart-Dispatches Synchronized to 15-Minute Windows</h2>
            <p>
              Meals leave local cloud kitchens exactly 22 minutes prior to your designated dining window.
              Heat-reflective packaging guarantees optimal serving temperature upon arrival.
            </p>
            <div className={styles.dispatchChecks}>
              <span>
                <Icon name="check_circle" size={16} className={styles.tertiaryText} />
                65°C Hot Delivery
              </span>
              <span>
                <Icon name="check_circle" size={16} className={styles.tertiaryText} />
                4°C Cryo-Pack Option
              </span>
            </div>
          </div>
        </section>

        <div className={setup.actions}>
          <Link to="/profile/setup/nutrition" className={styles.back}>
            <Icon name="arrow_back" size={18} />
            Back to Nutrition &amp; Macros
          </Link>
          <div className={styles.forward}>
            <button
              type="button"
              className={styles.draft}
              onClick={() => {
                setSavedAt(new Date())
                setDraftFlash(true)
              }}
            >
              {draftFlash ? (
                <>
                  <Icon name="check" size={16} className={styles.tertiaryText} />
                  Draft Saved
                </>
              ) : (
                'Save Draft'
              )}
            </button>
            <Link to="/profile/setup/review" className={setup.continue}>
              Continue to Review Profile
              <Icon name="arrow_forward" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </SetupShell>
  )
}
