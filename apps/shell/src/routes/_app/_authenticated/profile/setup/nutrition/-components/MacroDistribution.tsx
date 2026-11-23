import { Icon } from '../../../-components/Icon'
import type { MacroSplit } from '../../-components/setupData'
import styles from '../nutrition.module.css'
import { adjustSplit, formatNumber, gramsOf, MACROS } from './nutritionMath'

type MacroDistributionProps = {
  calories: number
  split: MacroSplit
  onChange: (split: MacroSplit) => void
}

/** Protein / fat / carb split. Protein and fat move in 5% steps; carbs take up the rest */
export function MacroDistribution({ calories, split, onChange }: MacroDistributionProps) {
  return (
    <section className={styles.panel} aria-labelledby="macros-title">
      <div className={styles.panelHead}>
        <h2 id="macros-title" className={styles.panelTitle}>
          <Icon name="pie_chart" size={20} className={styles.primaryText} />
          Macro Distribution
        </h2>
        <span className={styles.panelNote}>100% Calorie Parity</span>
      </div>

      <div className={styles.splitBar} aria-hidden="true">
        {MACROS.map((macro) => (
          <span key={macro.key} className={styles[`fill-${macro.key}`]} style={{ width: `${split[macro.key]}%` }} />
        ))}
      </div>

      <div className={styles.macroGrid}>
        {MACROS.map((macro) => {
          const percent = split[macro.key]
          const grams = gramsOf(calories, percent, macro.key)
          const key = macro.key
          return (
            <div key={key} className={styles.macroCard}>
              <div className={styles.macroHead}>
                <span className={styles.macroName}>
                  <span className={`${styles.dot} ${styles[`fill-${key}`]}`} />
                  {macro.label}
                </span>
                <span className={`${styles.percentChip} ${styles[`text-${key}`]}`}>{percent}%</span>
              </div>
              <div className={styles.macroGrams}>
                <strong>{grams}</strong>
                <span>g</span>
              </div>
              <span className={styles.macroNote}>
                {formatNumber(Math.round((calories * percent) / 100))} kcal • {macro.note}
              </span>
              {key === 'carbs' ? (
                <span className={styles.autoBalanced}>
                  <Icon name="balance" size={14} />
                  Auto-balanced
                </span>
              ) : (
                <div className={styles.macroAdjust}>
                  {[-5, 5].map((delta) => {
                    const next = adjustSplit(split, key, delta)
                    return (
                      <button
                        key={delta}
                        type="button"
                        disabled={!next}
                        aria-label={`${delta > 0 ? 'Increase' : 'Decrease'} ${macro.label.toLowerCase()} by 5%`}
                        onClick={() => next && onChange(next)}
                      >
                        <Icon name={delta > 0 ? 'add' : 'remove'} size={16} />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
