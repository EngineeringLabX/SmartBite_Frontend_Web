import { Icon } from '../../../-components/Icon'
import { CROSS_CONTACT_OPTIONS, type CrossContact } from '../../-components/setupData'
import styles from '../allergies.module.css'

type CrossContactPanelProps = {
  value: CrossContact
  onChange: (value: CrossContact) => void
}

/** How strictly kitchens must separate prep from the flagged allergens */
export function CrossContactPanel({ value, onChange }: CrossContactPanelProps) {
  return (
    <fieldset className={styles.panel}>
      <legend className={styles.panelTitle}>
        <Icon name="sanitizer" size={20} className={styles.tertiaryText} />
        Kitchen Cross-Contact Standard
      </legend>
      <p className={styles.panelHint}>
        Defines instructions generated for meal kits, partner restaurants, and culinary guidelines.
      </p>
      <div className={styles.protocols}>
        {CROSS_CONTACT_OPTIONS.map((option) => (
          <label key={option.value} className={`${styles.protocol} ${value === option.value ? styles.protocolOn : ''}`}>
            <input
              type="radio"
              name="cross-contact"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              <span className={styles.protocolName}>
                {option.label}
                {option.recommended && <span className={styles.recommended}>Recommended</span>}
              </span>
              <span className={styles.protocolText}>{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
