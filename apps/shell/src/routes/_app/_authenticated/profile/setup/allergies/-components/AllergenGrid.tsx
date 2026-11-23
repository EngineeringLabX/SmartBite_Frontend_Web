import { Icon } from '../../../-components/Icon'
import { ALLERGENS, SEVERITY_LEVELS, type AllergenLevel } from '../../-components/setupData'
import styles from '../allergies.module.css'

type AllergenGridProps = {
  levels: Record<string, AllergenLevel>
  onChange: (id: string, level: AllergenLevel) => void
}

/** Next severity when the level badge is clicked: 1 → 2 → 3 → 1 */
const nextLevel = (level: AllergenLevel): AllergenLevel => (level >= 3 ? 1 : ((level + 1) as AllergenLevel))

/** The standard allergen catalog: flag allergens and set how severe each one is */
export function AllergenGrid({ levels, onChange }: AllergenGridProps) {
  return (
    <div className={styles.allergenGrid}>
      {ALLERGENS.map((allergen) => {
        const level = levels[allergen.id] ?? 0

        if (level === 0) {
          return (
            <button
              key={allergen.id}
              type="button"
              className={`${styles.allergen} ${styles.allergenSafe}`}
              onClick={() => onChange(allergen.id, 2)}
            >
              <span className={styles.allergenTop}>
                <span className={styles.allergenIcon}>
                  <Icon name={allergen.icon} size={24} />
                </span>
                <span className={styles.permitted}>Safe / Permitted</span>
              </span>
              <span className={styles.allergenBody}>
                <span className={styles.allergenName}>{allergen.name}</span>
                <span className={styles.allergenText}>{allergen.safe}</span>
              </span>
              <span className={styles.allergenFoot}>
                <span className={styles.flagHint}>Tap to flag allergen</span>
                <span className={styles.addDot}>
                  <Icon name="add" size={16} />
                </span>
              </span>
            </button>
          )
        }

        const severity = SEVERITY_LEVELS[level]
        return (
          <div key={allergen.id} className={`${styles.allergen} ${styles[`level${level}`]}`}>
            <div className={styles.allergenTop}>
              <span className={styles.allergenIcon}>
                <Icon name={allergen.icon} size={24} />
              </span>
              <button
                type="button"
                className={styles.levelBadge}
                title="Change severity"
                aria-label={`${allergen.name}: level ${level}, ${severity.label}. Change severity`}
                onClick={() => onChange(allergen.id, nextLevel(level))}
              >
                <Icon name={severity.icon} size={14} />
                Level {level}
              </button>
            </div>
            <div className={styles.allergenBody}>
              <h3 className={styles.allergenName}>{allergen.name}</h3>
              <p className={styles.allergenText}>{allergen.flagged}</p>
            </div>
            <div className={styles.allergenFoot}>
              <span className={styles.status}>{severity.status}</span>
              <button
                type="button"
                className={styles.doneDot}
                title="Mark as safe"
                aria-label={`Remove ${allergen.name} from my allergens`}
                onClick={() => onChange(allergen.id, 0)}
              >
                <Icon name="done" size={16} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
