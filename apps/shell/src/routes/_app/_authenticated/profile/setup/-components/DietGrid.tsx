import { Icon } from '../../-components/Icon'
import styles from '../setup.module.css'
import { DIETS } from './setupData'

type DietGridProps = {
  selected: string[]
  onToggle: (id: string) => void
}

/** Primary nutritional frameworks: pick one or more */
export function DietGrid({ selected, onToggle }: DietGridProps) {
  return (
    <section className={styles.section} aria-labelledby="diets-title">
      <div className={styles.sectionHead}>
        <h2 id="diets-title" className={styles.sectionTitle}>
          <Icon name="restaurant_menu" size={22} filled className={styles.primaryText} />
          Primary Nutritional Frameworks
        </h2>
        <span className={styles.overline}>Select one or multiple</span>
      </div>

      <div className={styles.dietGrid}>
        {DIETS.map((diet) => {
          const isOn = selected.includes(diet.id)
          return (
            <button
              key={diet.id}
              type="button"
              className={`${styles.dietCard} ${isOn ? styles.dietCardOn : ''}`}
              aria-pressed={isOn}
              onClick={() => onToggle(diet.id)}
            >
              <span className={`${styles.dietIcon} ${isOn ? styles[`dietIcon-${diet.accent}`] : ''}`}>
                <Icon name={diet.icon} size={24} />
              </span>
              <span className={styles.dietText}>
                <span className={styles.dietName}>
                  {diet.name}
                  {diet.badge && (
                    <span className={`${styles.dietBadge} ${styles[`dietBadge-${diet.accent}`]}`}>{diet.badge}</span>
                  )}
                </span>
                <span className={styles.dietDescription}>{diet.description}</span>
              </span>
              <span className={styles.check}>
                <Icon name="check" size={16} />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
