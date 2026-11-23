import { Icon } from '../../../-components/Icon'
import { MEAL_IDEAS, MEAL_WINDOWS, type MacroSplit } from '../../-components/setupData'
import styles from '../nutrition.module.css'
import { formatNumber, gramsOf } from './nutritionMath'

type MealSplitProps = {
  calories: number
  split: MacroSplit
}

/** How the daily target spreads across meal windows */
export function MealSplit({ calories, split }: MealSplitProps) {
  return (
    <section className={styles.section} aria-labelledby="meal-split-title">
      <div className={styles.panelHead}>
        <h2 id="meal-split-title" className={styles.panelTitle}>
          <Icon name="restaurant" size={20} className={styles.primaryText} />
          Target Meal Split Distribution
        </h2>
        <span className={styles.panelNote}>{MEAL_WINDOWS.length} meal windows daily</span>
      </div>
      <div className={styles.mealGrid}>
        {MEAL_WINDOWS.map((meal) => {
          const kcal = (calories * meal.share) / 100
          return (
            <div key={meal.id} className={styles.mealCard}>
              <div className={styles.macroHead}>
                <span className={styles.macroName}>
                  <Icon name={meal.icon} size={18} className={styles.primaryText} />
                  {meal.label}
                </span>
                <span className={styles.shareChip}>{meal.share}%</span>
              </div>
              <div className={styles.mealKcal}>
                <strong>~{formatNumber(Math.round(kcal / 10) * 10)}</strong>
                <span>kcal</span>
              </div>
              <p className={styles.mealMacros}>
                P: {gramsOf(kcal, split.protein, 'protein')}g • F: {gramsOf(kcal, split.fat, 'fat')}g • C:{' '}
                {gramsOf(kcal, split.carbs, 'carbs')}g
              </p>
              <div className={styles.mealTrack}>
                <span style={{ width: `${meal.share}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

type MealIdeasProps = {
  /** Allergen ids flagged in stage 2 */
  flagged: string[]
}

/** Three sample dishes that pass the allergen screen */
export function MealIdeas({ flagged }: MealIdeasProps) {
  const safe = MEAL_IDEAS.filter((idea) => !idea.contains.some((id) => flagged.includes(id)))
  const screenedOut = MEAL_IDEAS.length - safe.length

  return (
    <section className={styles.section} aria-labelledby="ideas-title">
      <div className={styles.panelHead}>
        <h2 id="ideas-title" className={styles.panelTitle}>
          <Icon name="ramen_dining" size={20} className={styles.primaryText} />
          Suggested Meal Prototypes
        </h2>
        {screenedOut > 0 && (
          <span className={styles.screened}>
            <Icon name="shield_with_heart" size={14} />
            {screenedOut} hidden by your allergen profile
          </span>
        )}
      </div>
      {safe.length === 0 ? (
        <p className={styles.panelHint}>No sample dishes pass your allergen profile yet.</p>
      ) : (
        <div className={styles.ideaGrid}>
          {safe.slice(0, 3).map((idea) => (
            <article key={idea.id} className={styles.idea}>
              <div className={styles.ideaArt}>
                <Icon name={idea.icon} size={48} />
                <span className={styles.ideaTag}>
                  {idea.meal} • {idea.kcal} kcal
                </span>
              </div>
              <div className={styles.ideaBody}>
                <h3>{idea.name}</h3>
                <span>
                  <Icon name="check" size={14} />
                  {idea.highlight}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
