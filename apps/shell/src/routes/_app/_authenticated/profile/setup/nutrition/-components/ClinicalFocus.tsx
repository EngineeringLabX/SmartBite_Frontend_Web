import { Icon } from '../../../-components/Icon'
import { FOCUS_OPTIONS } from '../../-components/setupData'
import styles from '../nutrition.module.css'

type ClinicalFocusProps = {
  selected: string[]
  onChange: (selected: string[]) => void
}

/** Micro-nutrient limits applied when filtering recipes */
export function ClinicalFocus({ selected, onChange }: ClinicalFocusProps) {
  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])

  return (
    <fieldset className={styles.panel}>
      <legend className={styles.panelTitle}>
        <Icon name="health_metrics" size={20} className={styles.tertiaryText} />
        Clinical Focus &amp; Limits
      </legend>
      <p className={styles.panelHint}>Select automatic recipe micro-filtering constraints:</p>
      <div className={styles.focusList}>
        {FOCUS_OPTIONS.map((option) => (
          <label key={option.id} className={styles.focusItem}>
            <input type="checkbox" checked={selected.includes(option.id)} onChange={() => toggle(option.id)} />
            <span>
              <span className={styles.focusLabel}>{option.label}</span>
              <span className={styles.focusText}>{option.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
