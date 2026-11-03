import styles from '../profile.module.css'
import { MACROS, MEALS } from './profileData'
import { ProfileSection } from './ProfileSection'

export function MacrosSection() {
  return (
    <ProfileSection
      icon="monitoring"
      iconTone="green"
      title="Calorie Concerns & Macro Targets"
      description="Metabolic baseline: BMR 1,680 kcal • TDEE 2,250 kcal • Lean Muscle Sparing"
      aside={
        <div className={styles.goal}>
          <span>Goal:</span>
          <strong>Lean Maintenance (-100 kcal)</strong>
        </div>
      }
    >
      <div className={styles.energy}>
        <div className={styles.energyHead}>
          <strong>Daily Energy Split (2,150 kcal Total)</strong>
          <span>Balanced Performance Protocol</span>
        </div>
        <div className={styles.macroBar}>
          {MACROS.map((macro) => (
            <div
              key={macro.name}
              className={styles[`fill-${macro.tone}`]}
              style={{ width: `${macro.percent}%` }}
              title={`${macro.name} ${macro.percent}%`}
            />
          ))}
        </div>
        <div className={styles.macroLegend}>
          {MACROS.map((macro) => (
            <div key={macro.name}>
              <span className={styles.macroName}>
                <span className={`${styles.macroDot} ${styles[`fill-${macro.tone}`]}`} />
                {macro.name}
              </span>
              <strong className={styles.macroGrams}>{macro.grams}</strong>
              <span className={`${styles.small} ${styles.muted}`}>{macro.split}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <strong className={styles.labelMd}>Target Caloric Cadence per Meal</strong>
        <div className={styles.meals}>
          {MEALS.map((meal) => (
            <div key={meal.name} className={styles.meal}>
              <span className={styles.mealName}>{meal.name}</span>
              <strong>{meal.calories}</strong>
              <span className={`${styles.small} ${styles[meal.tone]}`}>{meal.focus}</span>
            </div>
          ))}
        </div>
      </div>
    </ProfileSection>
  )
}
