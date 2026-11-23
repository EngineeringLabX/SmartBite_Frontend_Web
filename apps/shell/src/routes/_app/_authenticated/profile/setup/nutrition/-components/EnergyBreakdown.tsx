import { Icon } from '../../../-components/Icon'
import type { MacroSplit } from '../../-components/setupData'
import styles from '../nutrition.module.css'
import { formatNumber, MACROS } from './nutritionMath'

type EnergyBreakdownProps = {
  calories: number
  baseline: number
  split: MacroSplit
}

const RADIUS = 48
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Donut of where the day's calories come from */
export function EnergyBreakdown({ calories, baseline, split }: EnergyBreakdownProps) {
  const status =
    calories < baseline - 100
      ? { label: 'Deficit', icon: 'trending_down', className: styles.statusDeficit }
      : calories > baseline + 100
        ? { label: 'Surplus', icon: 'trending_up', className: styles.statusSurplus }
        : { label: 'Balanced', icon: 'check_circle', className: styles.tertiaryText }

  // Draw arcs one after another around the ring: each starts where the previous ones end
  const arcs = MACROS.map((macro, index) => ({
    key: macro.key,
    length: (split[macro.key] / 100) * CIRCUMFERENCE,
    offset: (MACROS.slice(0, index).reduce((sum, m) => sum + split[m.key], 0) / 100) * CIRCUMFERENCE,
  }))

  return (
    <section className={`${styles.panel} ${styles.energy}`} aria-labelledby="energy-title">
      <div className={styles.panelHead}>
        <h2 id="energy-title" className={styles.panelTitle}>
          Energy Breakdown
        </h2>
        <Icon name="science" size={20} className={styles.mutedText} />
      </div>

      <div className={styles.donut}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="var(--p-container)" strokeWidth="12" />
          {arcs.map((arc) => (
            <circle
              key={arc.key}
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              className={styles[`stroke-${arc.key}`]}
              strokeWidth="12"
              strokeDasharray={`${arc.length} ${CIRCUMFERENCE}`}
              strokeDashoffset={-arc.offset}
            />
          ))}
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutLabel}>Daily Total</span>
          <strong>{formatNumber(calories)}</strong>
          <span className={`${styles.donutStatus} ${status.className}`}>
            <Icon name={status.icon} size={13} />
            {status.label}
          </span>
        </div>
      </div>

      <dl className={styles.donutLegend}>
        {MACROS.map((macro) => (
          <div key={macro.key}>
            <dt>{macro.label}</dt>
            <dd className={styles[`text-${macro.key}`]}>{split[macro.key]}%</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
