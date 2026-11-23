import { Icon } from '../../../-components/Icon'
import { WEEK_DAYS, type MealRoutine } from '../../-components/setupData'
import styles from '../routine.module.css'

type CulinaryCadenceProps = {
  routine: MealRoutine
  onChange: (patch: Partial<MealRoutine>) => void
}

/** "Mon - Fri" style range of week days, or a fallback when there are none */
function dayRange(from: number, to: number, none: string) {
  if (to < from) return none
  return from === to ? WEEK_DAYS[from] : `${WEEK_DAYS[from]} - ${WEEK_DAYS[to]}`
}

/** Weekly balance of prepared deliveries vs home cooking, plus the smart logistics card */
export function CulinaryCadence({ routine, onChange }: CulinaryCadenceProps) {
  const delivery = routine.deliveryDays
  const cooking = 7 - delivery

  return (
    <div className={styles.cadenceRow}>
      <section className={`${styles.section} ${styles.cadence}`} aria-labelledby="cadence-title">
        <div>
          <div className={styles.sectionHead}>
            <div>
              <h2 id="cadence-title" className={styles.sectionTitle}>
                Culinary Cadence &amp; Prep Mix
              </h2>
              <p className={styles.sectionHint}>
                Adjust your weekly balance between effortless deliveries and interactive home cooking.
              </p>
            </div>
            <Icon name="balance" size={28} className={styles.primaryText} />
          </div>

          <div className={styles.mix}>
            <div className={styles.mixHead}>
              <strong>Order Prepared Meals: {delivery} days/wk</strong>
              <strong className={styles.tertiaryText}>Home Smart Prep: {cooking} days/wk</strong>
            </div>
            <div className={styles.mixBar} aria-hidden="true">
              <span className={styles.mixDelivery} style={{ width: `${(delivery / 7) * 100}%` }} />
              <span className={styles.mixCooking} style={{ width: `${(cooking / 7) * 100}%` }} />
            </div>
            <div className={styles.mixScale}>
              <span>
                <i className={styles.mixDelivery} /> {dayRange(0, delivery - 1, 'No delivery days')}
                {delivery > 0 && delivery <= 5 && ' (Workday Focus)'}
              </span>
              <span>
                <i className={styles.mixCooking} /> {dayRange(delivery, 6, 'No home prep days')}
                {cooking > 0 && cooking <= 2 && ' (Culinary Leisure)'}
              </span>
            </div>
          </div>

          <div className={styles.daysField}>
            <label htmlFor="delivery-days">
              Prepared Delivery Days
              <strong className={styles.primaryText}>
                {delivery} Day{delivery === 1 ? '' : 's'}
              </strong>
            </label>
            <input
              id="delivery-days"
              type="range"
              min={0}
              max={7}
              value={delivery}
              aria-valuetext={`${delivery} delivery days, ${cooking} home prep days`}
              onChange={(event) => onChange({ deliveryDays: Number(event.target.value) })}
            />
            <div className={styles.daysScale}>
              <span>0 (All Home Cooked)</span>
              <span>3 (Hybrid)</span>
              <span>7 (100% Prepared)</span>
            </div>
          </div>
        </div>

        <p className={styles.note}>
          <Icon name="tips_and_updates" size={20} className={styles.primaryText} />
          Smart Prep Kits arrive pre-chopped, marinaded, and portioned with RFID cook-time instructions compatible with
          Smart Oven appliances.
        </p>
      </section>

      <section className={styles.logistics} aria-labelledby="logistics-title">
        <div className={styles.logisticsArt}>
          <Icon name="kitchen" size={72} />
          <div className={styles.logisticsCaption}>
            <span>Smart Logistics</span>
            <h2 id="logistics-title">Zero Food Waste Guarantee</h2>
          </div>
        </div>
        <p className={styles.logisticsText}>
          Our predictive kitchen sync matches prep kit deliveries to your specific calendar gaps, automatically pausing
          perishable drops if you schedule business travel.
        </p>
        <div className={styles.logisticsFoot}>
          <span id="fridge-label">Smart Fridge Sync</span>
          <button
            type="button"
            role="switch"
            aria-checked={routine.fridgeSync}
            aria-labelledby="fridge-label"
            className={`${styles.syncChip} ${routine.fridgeSync ? styles.syncOn : ''}`}
            onClick={() => onChange({ fridgeSync: !routine.fridgeSync })}
          >
            {routine.fridgeSync ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </section>
    </div>
  )
}
