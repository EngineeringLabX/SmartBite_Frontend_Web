import { Icon } from '../../-components/Icon'
import styles from '../setup.module.css'
import { ORGANIC_OPTIONS, SODIUM_LEVELS, SPICE_LEVELS, type Constraints } from './setupData'

type ConstraintsPanelProps = {
  value: Constraints
  onChange: (value: Constraints) => void
}

/** Organic sourcing, sodium threshold and heat tolerance */
export function ConstraintsPanel({ value, onChange }: ConstraintsPanelProps) {
  const set = (patch: Partial<Constraints>) => onChange({ ...value, ...patch })
  const organic = ORGANIC_OPTIONS.find((option) => option.value === value.organic)

  return (
    <section className={styles.constraints} aria-labelledby="constraints-title">
      <div className={styles.sectionHead}>
        <h2 id="constraints-title" className={styles.sectionTitle}>
          <Icon name="tune" size={22} className={styles.primaryText} />
          Culinary Constraints &amp; Sensitivity Bounds
        </h2>
        <span className={styles.engineChip}>
          <Icon name="memory" size={14} />
          Bio-Adaptive Engine Active
        </span>
      </div>

      <div className={styles.controlGrid}>
        <div className={styles.control}>
          <div>
            <div className={styles.controlHead}>
              <span className={styles.controlLabel}>
                <Icon name="spa" size={18} className={styles.tertiaryText} />
                Organic Sourcing
              </span>
              <span className={styles.controlValue}>{organic?.summary}</span>
            </div>
            <p className={styles.controlHint}>Prioritize regenerative agriculture &amp; non-GMO certified suppliers.</p>
          </div>
          <div className={styles.segmented} role="radiogroup" aria-label="Organic sourcing">
            {ORGANIC_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={value.organic === option.value}
                className={value.organic === option.value ? styles.segmentOn : undefined}
                onClick={() => set({ organic: option.value })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.control}>
          <div>
            <div className={styles.controlHead}>
              <label htmlFor="sodium" className={styles.controlLabel}>
                <Icon name="water_drop" size={18} className={styles.primaryText} />
                Sodium Threshold
              </label>
              <span className={`${styles.controlValue} ${styles.sodiumValue}`}>{SODIUM_LEVELS[value.sodium].summary}</span>
            </div>
            <p className={styles.controlHint}>Regulates broth reduction, seasoning salt, and cured preserves.</p>
          </div>
          <div>
            <input
              id="sodium"
              type="range"
              min={0}
              max={SODIUM_LEVELS.length - 1}
              step={1}
              value={value.sodium}
              aria-valuetext={SODIUM_LEVELS[value.sodium].summary}
              className={styles.slider}
              onChange={(event) => set({ sodium: Number(event.target.value) })}
            />
            <div className={styles.ticks}>
              {SODIUM_LEVELS.map((level) => (
                <span key={level.tick}>{level.tick}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.control}>
          <div>
            <div className={styles.controlHead}>
              <span className={styles.controlLabel}>
                <Icon name="mode_heat" size={18} className={styles.errorText} />
                Capsaicin / Heat
              </span>
              <span className={`${styles.controlValue} ${styles.errorText}`}>{SPICE_LEVELS[value.spice - 1]}</span>
            </div>
            <p className={styles.controlHint}>Calibrates chili extracts, black pepper, and warm curry notes.</p>
          </div>
          <div className={styles.spice} role="radiogroup" aria-label="Heat tolerance">
            {SPICE_LEVELS.map((label, index) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={value.spice === index + 1}
                aria-label={label}
                title={label}
                className={index < value.spice ? styles.spiceOn : undefined}
                onClick={() => set({ spice: index + 1 })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
