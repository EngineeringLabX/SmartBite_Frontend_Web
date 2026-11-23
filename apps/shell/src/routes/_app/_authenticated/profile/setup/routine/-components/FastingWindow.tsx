import { Icon } from '../../../-components/Icon'
import { CUSTOM_FEED_HOURS, FASTING_PROTOCOLS, type MealRoutine } from '../../-components/setupData'
import styles from '../routine.module.css'
import { formatHour } from './timeUtils'

type FastingWindowProps = {
  routine: MealRoutine
  onChange: (patch: Partial<MealRoutine>) => void
}

/** Intermittent fasting protocol and the 24-hour feeding bar */
export function FastingWindow({ routine, onChange }: FastingWindowProps) {
  const { fasting, protocol, firstBite, feedHours } = routine
  const lastBite = firstBite + feedHours
  const before = firstBite
  const after = 24 - lastBite

  // Keep the window inside one day when its length changes
  const fitWindow = (hours: number) => ({ feedHours: hours, firstBite: Math.min(firstBite, 24 - hours) })

  const status = !fasting
    ? 'Fasting Disabled (Normal Grazing)'
    : `${24 - feedHours}:${feedHours} ${protocol === 'custom' ? 'Custom Window' : 'Protocol'} Active`

  return (
    <section className={styles.section} aria-labelledby="fasting-title">
      <div className={styles.sectionHead}>
        <div>
          <h2 id="fasting-title" className={styles.sectionTitle}>
            <Icon name="hourglass_top" size={22} className={styles.primaryText} />
            Intermittent Fasting &amp; Eating Window
          </h2>
          <p className={styles.sectionHint}>
            Define your biological fasting period to prevent automated food deliveries during rest states.
          </p>
        </div>
        <div className={styles.toggle}>
          <button
            type="button"
            role="switch"
            aria-checked={fasting}
            aria-label="Intermittent fasting"
            className={`${styles.switch} ${fasting ? styles.switchOn : ''}`}
            onClick={() => onChange({ fasting: !fasting })}
          >
            <span />
          </button>
          <span>{status}</span>
        </div>
      </div>

      <div className={styles.protocolGrid} role="radiogroup" aria-label="Fasting protocol">
        {FASTING_PROTOCOLS.map((option) => {
          const isOn = protocol === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isOn}
              disabled={!fasting}
              className={`${styles.protocolChip} ${isOn ? styles.protocolChipOn : ''}`}
              onClick={() => onChange({ protocol: option.id, ...(option.feedHours ? fitWindow(option.feedHours) : {}) })}
            >
              <span className={styles.chipHead}>
                <strong>{option.label}</strong>
                <Icon name={option.id === 'custom' ? 'tune' : isOn ? 'check_circle' : 'circle'} size={16} />
              </span>
              <span className={styles.chipHint}>{option.hint}</span>
            </button>
          )
        })}
      </div>

      {fasting && (
        <div className={styles.windowControls}>
          <label>
            First bite
            <select value={firstBite} onChange={(event) => onChange({ firstBite: Number(event.target.value) })}>
              {Array.from({ length: 25 - feedHours }, (_, hour) => (
                <option key={hour} value={hour}>
                  {formatHour(hour)}
                </option>
              ))}
            </select>
          </label>
          {protocol === 'custom' && (
            <label>
              Eating window
              <select value={feedHours} onChange={(event) => onChange(fitWindow(Number(event.target.value)))}>
                {CUSTOM_FEED_HOURS.map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hours
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      <div className={styles.spectrum}>
        <div className={styles.spectrumHead}>
          <span className={styles.spectrumTitle}>
            <span className={styles.liveDot} />
            24-Hour Circadian Feeding Spectrum
          </span>
          {fasting && (
            <span className={styles.spectrumLegend}>
              <span>
                <i className={styles.legendFast} /> Fasting ({24 - feedHours}h)
              </span>
              <span>
                <i className={styles.legendEat} /> Eating Window ({feedHours}h)
              </span>
            </span>
          )}
        </div>

        {fasting ? (
          <>
            <div className={styles.dayBar}>
              {before > 0 && (
                <span className={styles.barFast} style={{ width: `${(before / 24) * 100}%` }}>
                  {before >= 5 && (
                    <>
                      <Icon name="nightlight" size={14} />
                      Rest &amp; Autophagy Phase ({before}h)
                    </>
                  )}
                </span>
              )}
              <span className={styles.barEat} style={{ width: `${(feedHours / 24) * 100}%` }}>
                <Icon name="wb_sunny" size={16} />
                <span className={styles.barEatText}>
                  Active Eating: {formatHour(firstBite)} – {formatHour(lastBite)} ({feedHours}h)
                </span>
              </span>
              {after > 0 && (
                <span className={styles.barFast} style={{ width: `${(after / 24) * 100}%` }}>
                  {after >= 3 && <span className={styles.digest}>Digest ({after}h)</span>}
                </span>
              )}
            </div>
            <div className={styles.dayScale}>
              <span>12:00 AM (Midnight)</span>
              <strong>{formatHour(firstBite)} (First Bite)</strong>
              <strong>{formatHour(lastBite)} (Last Bite)</strong>
              <span>11:59 PM</span>
            </div>
          </>
        ) : (
          <div className={`${styles.dayBar} ${styles.dayBarOpen}`}>
            <Icon name="restaurant" size={16} />
            Open eating schedule: deliveries can arrive any time of day
          </div>
        )}
      </div>
    </section>
  )
}
