import { Icon } from '../../../-components/Icon'
import { MEAL_SLOTS, type MealRoutine, type MealSlotId } from '../../-components/setupData'
import styles from '../routine.module.css'
import { formatClock, toMinutes } from './timeUtils'

type MealScheduleProps = {
  routine: MealRoutine
  /** Daily calorie target from stage 3 */
  calories: number
  onChange: (patch: Partial<MealRoutine>) => void
}

const formatKcal = (value: number) => (Math.round(value / 10) * 10).toLocaleString('en-US')

/** The three daily meal slots: when each arrives and how it is served */
export function MealSchedule({ routine, calories, onChange }: MealScheduleProps) {
  const windowStart = routine.firstBite * 60
  const windowEnd = (routine.firstBite + routine.feedHours) * 60

  const setTime = (id: MealSlotId, time: string) => onChange({ times: { ...routine.times, [id]: time } })
  const setOption = (id: MealSlotId, index: number) => onChange({ options: { ...routine.options, [id]: index } })

  return (
    <section className={styles.section} aria-labelledby="schedule-title">
      <div className={styles.sectionHead}>
        <div>
          <h2 id="schedule-title" className={styles.sectionTitle}>
            <Icon name="file_map_stack" size={22} className={styles.primaryText} />
            Daily Meal Schedule Configurator
          </h2>
          <p className={styles.sectionHint}>
            Customize daily fulfillment intervals and automated delivery dispatch protocols.
          </p>
        </div>
        <span className={styles.countChip}>{MEAL_SLOTS.length} Target Windows Active</span>
      </div>

      <div className={styles.slotGrid}>
        {MEAL_SLOTS.map((slot, index) => {
          const time = routine.times[slot.id]
          const start = toMinutes(time)
          const end = start + slot.minutes
          const outside = routine.fasting && (start < windowStart || end > windowEnd)
          const option = slot.options[routine.options[slot.id]]
          const kcal = (calories * slot.share) / 100

          return (
            <div key={slot.id} className={`${styles.slot} ${styles[`slot-${slot.tone}`]}`}>
              <div className={styles.slotTop}>
                <span className={styles.slotIcon}>
                  <Icon name={slot.icon} size={20} />
                </span>
                <span className={styles.slotNumber}>Slot {String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={styles.slotTitle}>{slot.label}</h3>
              <p className={styles.slotText}>{slot.description}</p>

              <label className={styles.fieldLabel} htmlFor={`time-${slot.id}`}>
                Fulfillment Timing
              </label>
              <div className={`${styles.timeField} ${outside ? styles.timeFieldWarn : ''}`}>
                <Icon name="access_time" size={18} />
                <input
                  id={`time-${slot.id}`}
                  type="time"
                  step={900}
                  value={time}
                  onChange={(event) => event.target.value && setTime(slot.id, event.target.value)}
                />
                <span className={styles.timeEnd}>
                  {slot.minutes >= 60 ? `– ${formatClock(end)}` : 'Sharp'}
                </span>
              </div>
              {outside && (
                <p className={styles.slotWarning} role="status">
                  <Icon name="warning" size={14} />
                  Outside your eating window. Deliveries are held during fasting.
                </p>
              )}

              <label className={styles.fieldLabel} htmlFor={`option-${slot.id}`}>
                {slot.optionLabel}
              </label>
              <select
                id={`option-${slot.id}`}
                className={styles.select}
                value={routine.options[slot.id]}
                onChange={(event) => setOption(slot.id, Number(event.target.value))}
              >
                {slot.options.map((choice, i) => (
                  <option key={choice.label} value={i}>
                    {choice.label}
                  </option>
                ))}
              </select>

              <div className={styles.slotFoot}>
                <span className={styles.kcal}>
                  <Icon name="bolt" size={16} />
                  {formatKcal(kcal - 50)} - {formatKcal(kcal + 50)} kcal
                </span>
                <span>{option.pack}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
