import { formatPrice } from '@smartbite/ui'
import { Icon } from '../../profile/-components/Icon'
import type { Allergen } from '../../profile/-components/profileData'
import styles from '../cart.module.css'
import { DAY_BUDGET, DELIVERY, RADAR_CHECKS, type CartItem } from './cartData'

export type TrayTotals = {
  count: number
  kcal: number
  protein: number
  carbs: number
  fat: number
}

const percent = (value: number, of: number) => Math.max(0, Math.min(100, (value / of) * 100))

/* ---------- Checkout stepper ---------- */

export function CheckoutStepper({ reference, mealCount }: { reference: string; mealCount: number }) {
  const steps = [
    { title: 'Tray Review', detail: `${mealCount} Validated ${mealCount === 1 ? 'Meal' : 'Meals'}` },
    { title: 'Kitchen Station', detail: DELIVERY.hub },
    { title: 'Safe Payment', detail: 'Biometric / Card' },
    { title: 'Prep Radar', detail: 'Live Telemetry' },
  ]

  return (
    <section className={styles.progress}>
      <div className={styles.progressHead}>
        <div className={styles.progressRef}>
          <span className={styles.tintChip}>
            <Icon name="restaurant" size={15} filled />
            Tray Telemetry
          </span>
          <span className={styles.muted}>
            Order Reference: <strong className={styles.fg}>{reference}</strong>
          </span>
        </div>
        <span className={styles.live}>
          <span className={styles.liveDot} />
          Live HACCP Active Monitoring
        </span>
      </div>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={index === 0 ? styles.stepActive : index === 1 ? styles.step : styles.stepLater}
            aria-current={index === 0 ? 'step' : undefined}
          >
            <span className={styles.stepNumber}>{index + 1}</span>
            <span className={styles.stepText}>
              <strong>
                {index + 1}. {step.title}
              </strong>
              <small>{step.detail}</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- Allergen radar ---------- */

export function AllergenRadar({
  items,
  allergens,
  name,
}: {
  items: CartItem[]
  allergens: Allergen[]
  name: string
}) {
  const results = RADAR_CHECKS.map((check) => ({
    ...check,
    hits: items.filter((item) => item.allergens.includes(check.allergen)),
  }))
  const passed = results.every((result) => result.hits.length === 0)
  const protocols = allergens
    .filter((allergen) => allergen.severity === 'Extreme' || allergen.severity === 'High')
    .map((allergen) => allergen.name.split(' ')[0])
    .join(' & ')

  return (
    <section className={styles.radar}>
      <div className={styles.radarHead}>
        <div className={styles.radarTitle}>
          <span className={passed ? styles.radarIcon : styles.radarIconAlert}>
            <Icon name={passed ? 'health_and_safety' : 'gpp_maybe'} size={22} />
          </span>
          <div>
            <h3>
              SmartBite Radar: {passed ? 'Zero Cross-Contact Confirmed' : 'Allergen Conflict Detected'}
            </h3>
            <p className={styles.small}>
              Real-time scan against <strong className={styles.fg}>{name}'s Profile</strong>
              {protocols && ` (${protocols} Anaphylaxis Protocols)`}
            </p>
          </div>
        </div>
        <span className={passed ? styles.passChip : styles.failChip}>
          {passed ? '100% Passed' : 'Review Needed'}
        </span>
      </div>
      <div className={styles.radarGrid}>
        {results.map((result) => (
          <div key={result.allergen} className={styles.radarCheck}>
            <Icon
              name={result.hits.length ? 'error' : 'verified'}
              size={18}
              className={result.hits.length ? styles.errorText : styles.tertiaryText}
            />
            <div>
              <strong>{result.title}</strong>
              <span>
                {result.hits.length
                  ? `Found in ${result.hits.map((item) => item.name).join(', ')}.`
                  : result.passed}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- AI add-on ---------- */

export function AddOnSuggestion({ item, onAdd }: { item: CartItem; onAdd: () => void }) {
  return (
    <section className={styles.addOn}>
      <div className={styles.addOnHead}>
        <span className={styles.addOnTitle}>
          <Icon name="auto_awesome" size={18} className={styles.primaryText} />
          AI Recommended Electrolyte Booster
        </span>
        <span className={styles.labelSm}>Complements Dinner Macros</span>
      </div>
      <div className={styles.addOnRow}>
        <div className={styles.addOnInfo}>
          <img src={item.image} alt={item.imageAlt} />
          <div>
            <div className={styles.addOnName}>
              <strong>{item.name}</strong>
              <span className={styles.matchMini}>{item.match}% Match</span>
            </div>
            <span className={styles.small}>
              {item.kcal} kcal • {item.highlight} • Nut-Safe
            </span>
          </div>
        </div>
        <div className={styles.addOnBuy}>
          <strong>+ {formatPrice(item.price)}</strong>
          <button type="button" className={styles.addButton} onClick={onAdd}>
            <Icon name="add" size={15} /> Add
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------- Bio-budget ---------- */

export function BioBudget({ totals }: { totals: TrayTotals }) {
  const { eatenKcal, targetKcal, maxKcal, eatenProtein, targetProtein, dinnerCarbs, dinnerFat } = DAY_BUDGET
  const buffer = targetKcal - eatenKcal - totals.kcal
  const proteinTotal = eatenProtein + totals.protein
  const proteinPercent = Math.round((proteinTotal / targetProtein) * 100)
  const carbsOver = totals.carbs > dinnerCarbs
  const fatOver = totals.fat > dinnerFat

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h3 className={styles.cardTitle}>
          <Icon name="monitor_heart" size={20} className={styles.primaryText} />
          Today's Bio-Budget Impact
        </h3>
        <span className={styles.tintChip}>Dinner Allocation</span>
      </div>

      <div className={styles.gauge}>
        <div className={styles.gaugeHead}>
          <strong>Dinner Calories: {totals.kcal.toLocaleString()} kcal</strong>
          <span className={buffer < 0 ? styles.errorText : styles.muted}>
            {buffer < 0
              ? `${Math.abs(buffer).toLocaleString()} kcal over target`
              : `${buffer.toLocaleString()} kcal buffer left`}
          </span>
        </div>
        <div className={styles.track}>
          <div
            className={styles.fillEaten}
            style={{ width: `${percent(eatenKcal, maxKcal)}%` }}
            title={`Breakfast & Lunch (${eatenKcal} kcal)`}
          />
          <div
            className={buffer < 0 ? styles.fillOver : styles.fillPrimary}
            style={{ width: `${percent(totals.kcal, maxKcal)}%` }}
            title={`This tray (+${totals.kcal} kcal)`}
          />
          {buffer > 0 && (
            <div
              className={styles.fillBuffer}
              style={{ width: `${percent(buffer, maxKcal)}%` }}
              title={`Calorie buffer (${buffer} kcal)`}
            />
          )}
        </div>
        <div className={styles.scale}>
          <span>0</span>
          <span>Target: {targetKcal.toLocaleString()} kcal/day</span>
          <span>Max: {maxKcal.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.gauge}>
        <div className={styles.gaugeHead}>
          <strong>Protein Synthesis: +{totals.protein}g</strong>
          {proteinPercent >= 100 ? (
            <span className={styles.goalHit}>
              <Icon name="check_circle" size={13} /> Goal Hit ({proteinPercent}%)
            </span>
          ) : (
            <span className={styles.muted}>{targetProtein - proteinTotal}g to go</span>
          )}
        </div>
        <div className={styles.trackThin}>
          <div className={styles.fillTertiary} style={{ width: `${percent(proteinTotal, targetProtein)}%` }} />
        </div>
        <p className={styles.note}>
          Total daily target: {targetProtein}g • Tray brings you to {proteinTotal}g
        </p>
      </div>

      <div className={styles.miniGrid}>
        <div className={styles.mini}>
          <span>Net Carbohydrates</span>
          <strong>+{totals.carbs}g</strong>
          <div className={styles.trackMini}>
            <div
              className={carbsOver ? styles.fillOver : styles.fillPrimaryLight}
              style={{ width: `${percent(totals.carbs, dinnerCarbs)}%` }}
            />
          </div>
          <small className={carbsOver ? styles.errorText : styles.primaryText}>
            {carbsOver ? 'Above dinner allowance' : 'Glycemic-stable zone'}
          </small>
        </div>
        <div className={styles.mini}>
          <span>Healthy Fats</span>
          <strong>+{totals.fat}g</strong>
          <div className={styles.trackMini}>
            <div
              className={fatOver ? styles.fillOver : styles.fillTertiary}
              style={{ width: `${percent(totals.fat, dinnerFat)}%` }}
            />
          </div>
          <small className={fatOver ? styles.errorText : styles.tertiaryText}>
            {fatOver ? 'Above dinner allowance' : 'Omega-3 rich'}
          </small>
        </div>
      </div>

      <div className={styles.insight}>
        <Icon name="psychology" size={18} className={styles.primaryText} />
        <p>
          <strong>Clinical AI Insight:</strong> This combination delivers complete branched-chain amino
          acids (BCAAs) with complex lentils and wild salmon, enhancing overnight muscle recovery while
          preserving light digestive transit before sleep.
        </p>
      </div>
    </section>
  )
}

/* ---------- Delivery ---------- */

export function DeliveryCard() {
  return (
    <section className={styles.cardTight}>
      <div className={styles.cardHead}>
        <span className={styles.addOnTitle}>
          <Icon name="local_shipping" size={18} className={styles.primaryText} />
          Delivery Logistics
        </span>
        <button type="button" className={styles.linkPrimary} disabled title="Coming soon">
          Change
        </button>
      </div>
      <div className={styles.delivery}>
        <div className={styles.address}>
          <Icon name="pin_drop" size={18} className={styles.outlineText} />
          <div>
            <strong>{DELIVERY.address}</strong>
            <span>{DELIVERY.area}</span>
          </div>
        </div>
        <div className={styles.slot}>
          <span>
            <Icon name="timer" size={16} className={styles.tertiaryText} />
            Target Kitchen Slot:
          </span>
          <strong>{DELIVERY.slot}</strong>
        </div>
        <p className={styles.note}>
          <Icon name="lock" size={14} />
          Tamper-evident bio-seal container guarantee
        </p>
      </div>
    </section>
  )
}

/* ---------- Order summary ---------- */

export type Bill = {
  subtotal: number
  packaging: number
  courier: number
  offset: number
  total: number
}

export function OrderSummary({
  bill,
  count,
  onCheckout,
}: {
  bill: Bill
  count: number
  onCheckout: () => void
}) {
  return (
    <section className={styles.summary}>
      <h3 className={styles.summaryTitle}>Clinical Order Summary</h3>
      <dl className={styles.lines}>
        <div>
          <dt>
            Item Subtotal ({count} {count === 1 ? 'item' : 'items'})
          </dt>
          <dd>{formatPrice(bill.subtotal)}</dd>
        </div>
        <div>
          <dt>
            AI Clinical Diagnostic
            <span title="Algorithmic cross-allergen validation">
              <Icon name="info" size={14} className={styles.outlineText} />
            </span>
          </dt>
          <dd className={styles.tertiaryText}>{formatPrice(0)} (Complimentary)</dd>
        </div>
        <div>
          <dt>HACCP Sterile Packaging &amp; Bio-Seal</dt>
          <dd>{formatPrice(bill.packaging)}</dd>
        </div>
        <div>
          <dt>Sterile Temperature Courier</dt>
          <dd>{formatPrice(bill.courier)}</dd>
        </div>
        {bill.offset > 0 && (
          <div className={styles.tertiaryText}>
            <dt>
              <Icon name="high_res" size={15} />
              High Wellness Match (5% Offset)
            </dt>
            <dd>− {formatPrice(bill.offset)}</dd>
          </div>
        )}
      </dl>

      <div className={styles.totalBlock}>
        <div className={styles.totalRow}>
          <div>
            <span className={styles.overline}>Total Amount</span>
            <small>Inclusive of all kitchen safety surcharges &amp; taxes</small>
          </div>
          <strong className={styles.total}>{formatPrice(bill.total)}</strong>
        </div>
        <button type="button" className={styles.checkout} onClick={onCheckout}>
          <Icon name="lock" size={18} />
          <span>Proceed to Safe Checkout • {formatPrice(bill.total)}</span>
          <Icon name="arrow_forward" size={18} className={styles.checkoutArrow} />
        </button>
        <div className={styles.trust}>
          <span>
            <Icon name="verified_user" size={13} className={styles.tertiaryText} />
            256-Bit Encrypted
          </span>
          <span>
            <Icon name="health_and_safety" size={13} className={styles.tertiaryText} />
            Zero-Contamination Guarantee
          </span>
          <span>
            <Icon name="shield" size={13} className={styles.tertiaryText} />
            Allergen Shield Insured
          </span>
        </div>
      </div>
    </section>
  )
}
