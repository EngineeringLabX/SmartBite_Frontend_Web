import { Icon } from '../../../-components/Icon'
import { CALORIE_LIMITS } from '../../-components/setupData'
import styles from '../nutrition.module.css'
import { clampCalories, formatNumber } from './nutritionMath'

type CalorieTargetProps = {
  calories: number
  /** Calories of the selected preset; ±100 kcal around it counts as the optimal range */
  baseline: number
  onChange: (calories: number) => void
}

/** Daily calorie target with ±50 kcal nudges and a slider */
export function CalorieTarget({ calories, baseline, onChange }: CalorieTargetProps) {
  const { min, max, step, nudge } = CALORIE_LIMITS

  return (
    <section className={styles.panel} aria-labelledby="calories-title">
      <div className={styles.panelHead}>
        <h2 id="calories-title" className={styles.panelTitle}>
          <Icon name="local_fire_department" size={22} className={styles.primaryText} />
          Daily Calorie Target
        </h2>
        <span className={styles.rangeChip}>
          Optimal Range: {formatNumber(baseline - 100)} - {formatNumber(baseline + 100)}
        </span>
      </div>

      <div className={styles.calorieRow}>
        <div className={styles.calorieValue}>
          <strong>{formatNumber(calories)}</strong>
          <span>kcal / day</span>
        </div>
        <div className={styles.nudger}>
          <button
            type="button"
            aria-label={`Decrease by ${nudge} kcal`}
            disabled={calories <= min}
            onClick={() => onChange(clampCalories(calories - nudge))}
          >
            <Icon name="remove" size={18} />
          </button>
          <span>±{nudge} kcal</span>
          <button
            type="button"
            aria-label={`Increase by ${nudge} kcal`}
            disabled={calories >= max}
            onClick={() => onChange(clampCalories(calories + nudge))}
          >
            <Icon name="add" size={18} />
          </button>
        </div>
      </div>

      <input
        type="range"
        className={styles.calorieSlider}
        min={min}
        max={max}
        step={step}
        value={calories}
        aria-label="Daily calorie target"
        aria-valuetext={`${formatNumber(calories)} kcal per day`}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className={styles.sliderScale}>
        <span>{formatNumber(min)} kcal (Deficit)</span>
        <span className={styles.primaryText}>Current ({formatNumber(calories)})</span>
        <span>{formatNumber(max)} kcal (Surplus)</span>
      </div>
    </section>
  )
}
