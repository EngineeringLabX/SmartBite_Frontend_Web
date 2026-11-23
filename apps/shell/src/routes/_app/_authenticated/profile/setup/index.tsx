import { createFileRoute, Link } from '@tanstack/react-router'
import { Icon } from '../-components/Icon'
import { ConstraintsPanel } from './-components/ConstraintsPanel'
import { DietGrid } from './-components/DietGrid'
import { SetupShell } from './-components/SetupShell'
import { DIETS, SETUP_STEPS } from './-components/setupData'
import { useSetup } from './-components/setupState'
import styles from './setup.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/setup/')({
  component: ProfileSetup,
})

// Stage 1 of the customer profile setup
const STEP = 0

/** Joins phrases as "a, b or c" */
function listOr(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`
}

function ProfileSetup() {
  const { diets, constraints, update } = useSetup()

  const toggleDiet = (id: string) =>
    update((current) => ({
      ...current,
      diets: current.diets.includes(id) ? current.diets.filter((d) => d !== id) : [...current.diets, id],
    }))

  const rules = DIETS.filter((diet) => diets.includes(diet.id)).map((diet) => diet.rule)
  const completion = Math.round(((STEP + 1) / SETUP_STEPS.length) * 100)
  const next = SETUP_STEPS[STEP + 1]

  return (
    <SetupShell currentStep={STEP}>
      <div className={styles.card}>
        <div className={styles.intro}>
          <div>
            <div className={styles.stage}>
              <span className={styles.stageChip}>Protocol Setup</span>
              <span className={styles.stageCount}>
                Stage {String(STEP + 1).padStart(2, '0')} of {String(SETUP_STEPS.length).padStart(2, '0')}
              </span>
            </div>
            <h1 className={styles.title}>What dietary paths do you follow?</h1>
            <p className={styles.lead}>
              SmartBite AI cross-references every restaurant dish, ingredient manifest, and kitchen recipe against your
              selected lifestyle protocols.
            </p>
          </div>
          <div className={styles.meter}>
            <div className={styles.meterHead}>
              <span>Completion</span>
              <strong>{completion}%</strong>
            </div>
            <div
              className={styles.meterTrack}
              role="progressbar"
              aria-label="Setup completion"
              aria-valuenow={completion}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${completion}%` }} />
            </div>
            <div className={styles.meterEnds}>
              <span>Dietary</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <DietGrid selected={diets} onToggle={toggleDiet} />
        <ConstraintsPanel value={constraints} onChange={(value) => update((current) => ({ ...current, constraints: value }))} />

        <div className={styles.banner}>
          <span className={styles.bannerIcon}>
            <Icon name="insights" size={28} filled />
          </span>
          <div className={styles.bannerText}>
            <div className={styles.bannerHead}>
              <h3>AI Smart Filtering Protocol {rules.length ? 'Initialized' : 'Standing By'}</h3>
              <span className={styles.bannerTag}>Real-Time Screen</span>
            </div>
            <p>
              {rules.length ? (
                <>
                  Dishes with <strong>{listOr(rules)}</strong> will automatically display clear clinical warning flags
                  or be quarantined entirely from your personalized meal suggestions.
                </>
              ) : (
                'Select at least one framework above and SmartBite AI will start screening dishes against it.'
              )}
            </p>
          </div>
          <span className={styles.safety}>
            <Icon name="verified" size={18} className={styles.primaryText} />
            99.8% Safety Index
          </span>
        </div>

        <div className={styles.actions}>
          <Link to="/profile/setup/allergies" className={styles.skip}>
            <Icon name="fast_forward" size={18} />
            Skip lifestyle preferences for now
          </Link>
          <Link to="/profile/setup/allergies" className={styles.continue}>
            Continue to {next.label}
            <Icon name="arrow_forward" size={20} />
          </Link>
        </div>
      </div>
    </SetupShell>
  )
}
