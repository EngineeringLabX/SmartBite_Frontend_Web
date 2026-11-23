import { Icon } from '../../../-components/Icon'
import { PORTIONS, type PortionId } from '../../-components/setupData'
import styles from '../routine.module.css'

type PortionArchetypeProps = {
  value: PortionId
  onChange: (value: PortionId) => void
}

/** How meal volume relates to calories: balanced, high volume or compact */
export function PortionArchetype({ value, onChange }: PortionArchetypeProps) {
  return (
    <section className={styles.section} aria-labelledby="portion-title">
      <div>
        <h2 id="portion-title" className={styles.sectionTitle}>
          <Icon name="format_size" size={22} className={styles.primaryText} />
          Portion Size &amp; Caloric Density Archetype
        </h2>
        <p className={styles.sectionHint}>
          Select how you prefer your daily micronutrients and macronutrients distributed across volume.
        </p>
      </div>

      <div className={styles.portionGrid} role="radiogroup" aria-labelledby="portion-title">
        {PORTIONS.map((portion) => {
          const isOn = value === portion.id
          return (
            <button
              key={portion.id}
              type="button"
              role="radio"
              aria-checked={isOn}
              className={`${styles.portion} ${isOn ? styles.portionOn : ''}`}
              onClick={() => onChange(portion.id)}
            >
              <span className={styles.portionTop}>
                <Icon name={portion.icon} size={24} />
                <span className={styles.radioDot}>{isOn && <Icon name="check" size={14} />}</span>
              </span>
              <strong className={styles.portionName}>{portion.label}</strong>
              <span className={styles.portionText}>{portion.description}</span>
              <span className={styles.satiety}>
                Satiety Index
                <strong className={portion.best ? styles.tertiaryText : undefined}>{portion.satiety}</strong>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
