import { Icon } from '../../../-components/Icon'
import { MEAL_IDEAS, type CrossContact } from '../../-components/setupData'
import type { SetupValues } from '../../-components/setupState'
import styles from '../review.module.css'

const PROTOCOL_LEVEL: Record<CrossContact, { label: string; level: string }> = {
  isolation: { label: 'Clinical Grade', level: 'STRICT L3' },
  standard: { label: 'Standard Kitchen', level: 'STANDARD L2' },
  lifestyle: { label: 'Lifestyle', level: 'TRACE L1' },
}

type ReviewSidebarProps = Pick<SetupValues, 'allergens' | 'customTags' | 'crossContact' | 'epiPen'>

/** SafeCore verification summary, a sample dish that passes the screen, and the edit note */
export function ReviewSidebar({ allergens, customTags, crossContact, epiPen }: ReviewSidebarProps) {
  const flagged = Object.keys(allergens).filter((id) => allergens[id] > 0)
  const parameters = flagged.length + customTags.length
  const hasSevere = flagged.some((id) => allergens[id] === 3)
  const protocol = PROTOCOL_LEVEL[crossContact]
  const sample = MEAL_IDEAS.find((idea) => !idea.contains.some((id) => flagged.includes(id)))

  const checks = [
    crossContact === 'isolation' ? 'Zero Cross-Contact Kitchen Verification' : 'Clean Utensil Kitchen Verification',
    'Real-time Ingredient Lineup Telemetry',
    'Automatic Swap for Non-Compliant Sauces',
    ...(epiPen && hasSevere ? ['Emergency Epinephrine Alert on QR Seal'] : []),
  ]

  return (
    <aside className={styles.sidebar}>
      <section className={styles.seal} aria-labelledby="seal-title">
        <div className={styles.sealHead}>
          <span className={styles.sealIcon}>
            <Icon name="verified_user" size={28} filled />
          </span>
          <div>
            <span className={styles.sealOverline}>Certification Active</span>
            <h2 id="seal-title">SafeCore™ Clinical Verification</h2>
          </div>
        </div>
        <p>
          Every dish and catering batch is automatically scrubbed against your{' '}
          <strong>
            {parameters} safety parameter{parameters === 1 ? '' : 's'}
          </strong>{' '}
          before payment processing or order confirmation.
        </p>
        <ul className={styles.checks}>
          {checks.map((check) => (
            <li key={check}>
              <Icon name="check" size={18} className={styles.tertiaryText} />
              {check}
            </li>
          ))}
        </ul>
        <div className={styles.level}>
          <span>
            <Icon name="medical_services" size={20} className={styles.primaryText} />
            Protocol Level: {protocol.label}
          </span>
          <strong>{protocol.level}</strong>
        </div>
      </section>

      {sample && (
        <section className={styles.sample} aria-labelledby="sample-title">
          <div className={styles.sampleHead}>
            <span className={styles.overline}>Curated Sample Match</span>
            <span className={styles.match}>Top Match</span>
          </div>
          <div className={styles.sampleArt}>
            <Icon name={sample.icon} size={56} />
            <span className={styles.approved}>
              <Icon name="check_circle" size={14} />
              SafeCore™ Approved
            </span>
          </div>
          <h3 id="sample-title">{sample.name}</h3>
          <div className={styles.sampleStats}>
            <span>{sample.meal}</span>
            <span>{sample.kcal} kcal</span>
            <span>{sample.highlight}</span>
          </div>
        </section>
      )}

      <p className={styles.audit}>
        <Icon name="fact_check" size={20} className={styles.primaryText} />
        You can change any of these values later from your Wellness Profile. Changes apply to future meal suggestions
        and orders.
      </p>
    </aside>
  )
}
