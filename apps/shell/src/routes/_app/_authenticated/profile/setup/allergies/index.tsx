import { createFileRoute, Link } from '@tanstack/react-router'
import { Icon } from '../../-components/Icon'
import { SetupShell } from '../-components/SetupShell'
import { ALLERGENS, SETUP_STEPS, type AllergenLevel } from '../-components/setupData'
import { useSetup } from '../-components/setupState'
import setup from '../setup.module.css'
import { AllergenGrid } from './-components/AllergenGrid'
import { CrossContactPanel } from './-components/CrossContactPanel'
import { CustomSensitivities } from './-components/CustomSensitivities'
import { SafeCorePipeline } from './-components/SafeCorePipeline'
import styles from './allergies.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/setup/allergies/')({
  component: AllergiesSetup,
})

// Stage 2 of the customer profile setup
const STEP = 1

/** Joins names as "a, b and c" */
function listAnd(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function AllergiesSetup() {
  const { diets, allergens, customTags, crossContact, epiPen, update } = useSetup()

  const setLevel = (id: string, level: AllergenLevel) =>
    update((current) => ({ ...current, allergens: { ...current.allergens, [id]: level } }))

  const activeCount = ALLERGENS.filter((a) => (allergens[a.id] ?? 0) > 0).length
  const severe = ALLERGENS.filter((a) => allergens[a.id] === 3).map((a) => a.name)
  const remaining = SETUP_STEPS.length - STEP - 1

  return (
    <SetupShell currentStep={STEP}>
      <div className={setup.card}>
        <div className={styles.statusBar}>
          <div className={styles.statusDone}>
            <span className={`${styles.statusCheck} ${diets.length ? '' : styles.statusSkipped}`}>
              <Icon name={diets.length ? 'check' : 'fast_forward'} size={20} />
            </span>
            <span>
              <span className={styles.statusOverline}>Step 1 {diets.length ? 'Complete' : 'Skipped'}</span>
              <strong>{diets.length ? 'Dietary Blueprint Saved' : 'No Dietary Frameworks Selected'}</strong>
            </span>
          </div>
          <div className={styles.statusNow}>
            <span className={styles.nowPill}>
              <span className={styles.pulse} />
              Step 2: Allergens &amp; SafeCore™ Protocol
            </span>
            <span className={styles.remaining}>Remaining: {remaining} Steps</span>
          </div>
        </div>

        <div className={setup.intro}>
          <div>
            <span className={styles.systemChip}>
              <Icon name="shield_with_heart" size={16} className={styles.tertiaryText} />
              Clinical Allergen Protection System
            </span>
            <h1 className={setup.title}>Allergies &amp; Food Sensitivities</h1>
            <p className={setup.lead}>
              Our patented SafeCore™ clinical isolation engine enforces strict hard stops, ingredient filtration, and
              automated kitchen safety checklists across all AI meal suggestions.
            </p>
          </div>
          <div className={styles.legend}>
            <span className={setup.overline}>Severity Classification</span>
            <div className={styles.legendChips}>
              <span className={`${styles.legendChip} ${styles.legend3}`}>Level 3: Severe</span>
              <span className={`${styles.legendChip} ${styles.legend2}`}>Level 2: Moderate</span>
              <span className={`${styles.legendChip} ${styles.legend1}`}>Level 1: Mild</span>
            </div>
          </div>
        </div>

        <section className={setup.section} aria-labelledby="catalog-title">
          <div className={setup.sectionHead}>
            <div>
              <h2 id="catalog-title" className={styles.catalogTitle}>
                Standard Allergens Catalog
              </h2>
              <p className={styles.catalogHint}>
                Tap a card to flag an allergen, then tap its level badge to adjust the risk threshold tier.
              </p>
            </div>
            <span className={styles.safeguards}>
              {activeCount} Active Safeguard{activeCount === 1 ? '' : 's'}
            </span>
          </div>
          <AllergenGrid levels={allergens} onChange={setLevel} />
        </section>

        <div className={styles.bento}>
          <CustomSensitivities
            tags={customTags}
            onChange={(tags) => update((current) => ({ ...current, customTags: tags }))}
          />
          <CrossContactPanel
            value={crossContact}
            onChange={(value) => update((current) => ({ ...current, crossContact: value }))}
          />
        </div>

        <section className={styles.emergency}>
          <div className={styles.emergencyMain}>
            <span className={styles.emergencyIcon}>
              <Icon name="medical_services" size={28} />
            </span>
            <div>
              <div className={styles.emergencyHead}>
                <h3 id="epipen-title">EpiPen &amp; Medical Emergency Protocol</h3>
                <span className={`${styles.activeTag} ${epiPen ? '' : styles.activeTagOff}`}>
                  {epiPen ? 'Active' : 'Off'}
                </span>
              </div>
              <p>
                {!epiPen
                  ? 'Partner chefs will not receive emergency alerts for your allergens.'
                  : severe.length
                    ? `Emergency auto-injector prescribed for ${listAnd(severe)}. If detected in kitchen integrations, automatic alerts are dispatched to partner chefs.`
                    : 'No Level 3 allergens flagged yet. Mark an allergen as severe to dispatch automatic alerts to partner chefs when it is detected.'}
              </p>
            </div>
          </div>
          <div className={styles.emergencyActions}>
            <button type="button" className={styles.contactButton} disabled title="Coming soon">
              Edit Emergency Contact
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={epiPen}
              aria-labelledby="epipen-title"
              className={`${styles.switch} ${epiPen ? styles.switchOn : ''}`}
              onClick={() => update((current) => ({ ...current, epiPen: !current.epiPen }))}
            >
              <span />
            </button>
          </div>
        </section>

        <SafeCorePipeline />

        <div className={setup.actions}>
          <Link to="/profile/setup" className={styles.back}>
            <Icon name="arrow_back" size={18} />
            Back to Dietary Preferences
          </Link>
          <div className={styles.forward}>
            <span className={styles.autoSaved}>Allergen preferences auto-saved</span>
            <Link to="/profile/setup/nutrition" className={setup.continue}>
              Continue to Macro Targets
              <Icon name="arrow_forward" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </SetupShell>
  )
}
