import { useState } from 'react'
import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import { PERFORMANCE_TILES } from './data'

const RANGES = ['Last 7 Days', 'Last 30 Days'] as const

export function PerformanceSummary() {
  // Only the 7-day figures are sample data so far; switching range just changes the highlight
  const [range, setRange] = useState<(typeof RANGES)[number]>('Last 7 Days')

  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitleRow}>
          <span className={styles.panelIcon}>
            <Icon name="insights" size={20} />
          </span>
          <div>
            <h2 className={styles.panelTitle}>Performance Summary &amp; Horizon Trends</h2>
            <p className={styles.panelSub}>Historical performance metrics across key operational windows</p>
          </div>
        </div>
        <div className={styles.segmented} role="group" aria-label="Time range">
          {RANGES.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={range === label}
              className={range === label ? styles.segmentActive : styles.segment}
              onClick={() => setRange(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.perfGrid}>
        {PERFORMANCE_TILES.map((tile) => (
          <div key={tile.label} className={styles.perfTile}>
            <p className={styles.perfLabel}>{tile.label}</p>
            <div className={styles.perfValueRow}>
              <span className={`${styles.perfValue} ${tile.valueTone === 'good' ? styles.perfValueGood : ''}`}>
                {tile.value}
              </span>
              <span className={tile.badge.tone === 'chip' ? styles.perfChip : styles.perfBadge}>{tile.badge.text}</span>
            </div>
            {tile.progress !== undefined && (
              <div className={styles.progressTrack} role="presentation">
                <div className={styles.progressFillBlue} style={{ width: `${tile.progress * 100}%` }} />
              </div>
            )}
            {tile.lines.map((line) => (
              <p key={line} className={styles.perfLine}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
