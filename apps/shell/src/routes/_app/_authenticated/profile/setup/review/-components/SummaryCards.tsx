import { Icon } from '../../../-components/Icon'
import {
  ALLERGENS,
  CROSS_CONTACT_OPTIONS,
  DIETS,
  MEAL_SLOTS,
  SODIUM_LEVELS,
  SPICE_LEVELS,
} from '../../-components/setupData'
import type { SetupValues } from '../../-components/setupState'
import { formatNumber, gramsOf, MACROS } from '../../nutrition/-components/nutritionMath'
import { formatClock, formatHour, toMinutes } from '../../routine/-components/timeUtils'
import styles from '../review.module.css'
import { ReviewCard } from './ReviewCard'

const ORGANIC_CHIPS = { strict: 'Organic Only (Strict)', preferred: 'Organic Preferred (Non-GMO)', neutral: null }

/** Stage 1: dietary frameworks and culinary constraints */
export function DietaryCard({ diets, constraints }: Pick<SetupValues, 'diets' | 'constraints'>) {
  const selected = DIETS.filter((diet) => diets.includes(diet.id))
  const organic = ORGANIC_CHIPS[constraints.organic]

  return (
    <ReviewCard
      icon="restaurant_menu"
      title="Dietary Protocols"
      tag={selected.length ? 'Active AI Filter' : 'No Framework'}
      tagTone={selected.length ? 'primary' : 'muted'}
      hint="Gastronomic styling and sourcing constraints applied across all menus."
      editTo="/profile/setup"
    >
      <div className={styles.chips}>
        {selected.map((diet) => (
          <span key={diet.id} className={styles.chip}>
            <Icon name={diet.icon} size={16} className={styles.primaryText} />
            {diet.name}
          </span>
        ))}
        {organic && (
          <span className={styles.chip}>
            <Icon name="local_florist" size={16} className={styles.primaryText} />
            {organic}
          </span>
        )}
        <span className={styles.chip}>
          <Icon name="water_drop" size={16} className={styles.primaryText} />
          Sodium: {SODIUM_LEVELS[constraints.sodium].summary}
        </span>
        <span className={styles.chip}>
          <Icon name="whatshot" size={16} className={styles.primaryText} />
          {SPICE_LEVELS[constraints.spice - 1]} Tolerance
        </span>
      </div>
      {selected.length === 0 && (
        <p className={styles.note}>
          <Icon name="info" size={18} className={styles.primaryText} />
          No dietary framework selected, so dishes are only screened for allergens and nutrition targets.
        </p>
      )}
    </ReviewCard>
  )
}

const LEVEL_COPY = {
  3: { suffix: 'Lockdown', detail: 'Severe anaphylactic • Zero airborne or line exposure permitted.', icon: 'warning' },
  2: { suffix: 'Exclusion', detail: 'Moderate • Strictly excluded, with segregated prep and fryers.', icon: 'shield' },
  1: { suffix: 'Sensitivity', detail: 'Mild • Flagged on menus; substitutions acceptable.', icon: 'do_not_touch' },
} as const

/** Stage 2: flagged allergens, custom exclusions and the kitchen protocol */
export function AllergenCard({ allergens, customTags, crossContact }: Pick<SetupValues, 'allergens' | 'customTags' | 'crossContact'>) {
  const flagged = ALLERGENS.filter((a) => (allergens[a.id] ?? 0) > 0).sort(
    (a, b) => (allergens[b.id] ?? 0) - (allergens[a.id] ?? 0),
  )
  const hasSevere = flagged.some((a) => allergens[a.id] === 3)
  const protocol = CROSS_CONTACT_OPTIONS.find((option) => option.value === crossContact)

  return (
    <ReviewCard
      icon="health_and_safety"
      title="Allergen Hard-Stops & Strict Protections"
      tag={hasSevere ? 'Zero Compromise' : flagged.length ? 'Protected' : 'None Flagged'}
      tagTone={hasSevere ? 'error' : flagged.length ? 'secondary' : 'muted'}
      hint="Cross-contamination protocols validated against partner culinary kitchens."
      editTo="/profile/setup/allergies"
      danger
    >
      {flagged.length + customTags.length === 0 ? (
        <p className={styles.note}>
          <Icon name="info" size={18} className={styles.primaryText} />
          No allergens or custom sensitivities flagged. All standard ingredients are permitted.
        </p>
      ) : (
        <div className={styles.rules}>
          {flagged.map((allergen) => {
            const level = allergens[allergen.id] as 1 | 2 | 3
            const copy = LEVEL_COPY[level]
            return (
              <div key={allergen.id} className={`${styles.rule} ${styles[`rule-${level}`]}`}>
                <span className={styles.ruleIcon}>
                  <Icon name={copy.icon} size={16} />
                </span>
                <span>
                  <strong>
                    {allergen.name} {copy.suffix}
                  </strong>
                  <span>{copy.detail}</span>
                </span>
              </div>
            )
          })}
          {customTags.map((tag) => (
            <div key={tag} className={`${styles.rule} ${styles['rule-custom']}`}>
              <span className={styles.ruleIcon}>
                <Icon name="block" size={16} />
              </span>
              <span>
                <strong>{tag} Excluded</strong>
                <span>Custom sensitivity flag applied to all recipes and garnishes.</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {protocol && (
        <div className={styles.protocol}>
          <Icon name="security" size={20} className={styles.primaryText} />
          <div>
            <strong>Kitchen Protocol: {protocol.label}</strong>
            <span>{protocol.description}</span>
          </div>
          {protocol.recommended && <span className={styles.certified}>Tier 1 Certified</span>}
        </div>
      )}
    </ReviewCard>
  )
}

/** Stage 3: calorie target, macro split and per-slot calories */
export function MacroCard({ nutrition }: Pick<SetupValues, 'nutrition'>) {
  const { calories, split, focus } = nutrition

  return (
    <ReviewCard
      icon="monitoring"
      title="Macro & Caloric Baseline"
      tag={nutrition.preset === 'custom' ? 'Custom Targets' : 'TDEE Adjusted'}
      tagTone="secondary"
      hint="Engineered for clean lean-mass synthesis and steady glycemic curve."
      editTo="/profile/setup/nutrition"
    >
      <div className={styles.macroPanel}>
        <div className={styles.energyRow}>
          <div>
            <span className={styles.overline}>Daily Energy Target</span>
            <div className={styles.energyValue}>
              <strong>{formatNumber(calories)}</strong>
              <span>kcal / day</span>
            </div>
          </div>
          <div className={styles.slotKcal}>
            {MEAL_SLOTS.map((slot) => (
              <span key={slot.id}>
                <strong>{slot.label.replace(' Window', '')}:</strong> ~
                {formatNumber(Math.round((calories * slot.share) / 1000) * 10)} kcal
              </span>
            ))}
          </div>
        </div>

        <div className={styles.splitBar} aria-hidden="true">
          {MACROS.map((macro) => (
            <span key={macro.key} className={styles[`fill-${macro.key}`]} style={{ width: `${split[macro.key]}%` }} />
          ))}
        </div>

        <dl className={styles.macroStats}>
          {MACROS.map((macro) => (
            <div key={macro.key}>
              <dt>
                <i className={styles[`fill-${macro.key}`]} />
                {macro.label}
              </dt>
              <dd>{gramsOf(calories, split[macro.key], macro.key)}g</dd>
              <span>
                {split[macro.key]}% • {macro.note}
              </span>
            </div>
          ))}
          {focus.includes('fiber') && (
            <div>
              <dt>
                <i className={styles.fillFiber} />
                Dietary Fiber
              </dt>
              <dd className={styles.tertiaryText}>35g+</dd>
              <span>Microbiome lock</span>
            </div>
          )}
        </dl>
      </div>
    </ReviewCard>
  )
}

/** Stage 4: fasting window and when the main meals arrive */
export function ScheduleCard({ routine }: Pick<SetupValues, 'routine'>) {
  const windowStart = routine.firstBite * 60
  const windowEnd = (routine.firstBite + routine.feedHours) * 60
  const slots = MEAL_SLOTS.filter((slot) => slot.id !== 'snack')
  const aligned =
    !routine.fasting ||
    MEAL_SLOTS.every((slot) => {
      const start = toMinutes(routine.times[slot.id])
      return start >= windowStart && start + slot.minutes <= windowEnd
    })

  return (
    <ReviewCard
      icon="schedule"
      title="Schedule & Delivery Routine"
      tag={aligned ? 'Circadian Aligned' : 'Needs Attention'}
      tagTone={aligned ? 'muted' : 'error'}
      hint="Thermal hot-drop logistics synchronized with your eating window."
      editTo="/profile/setup/routine"
    >
      <div className={styles.schedule}>
        <div className={styles.scheduleItem}>
          <span className={`${styles.scheduleLabel} ${styles.primaryText}`}>
            <Icon name="timelapse" size={18} />
            Protocol
          </span>
          <strong>{routine.fasting ? `${24 - routine.feedHours}:${routine.feedHours} Fasting` : 'Open Schedule'}</strong>
          <p>
            {routine.fasting
              ? `Eating window opens at ${formatHour(routine.firstBite)} and seals ${routine.feedHours} hours later.`
              : 'No fasting window; deliveries can arrive at any time.'}
          </p>
          {routine.fasting && (
            <span className={styles.windowPill}>
              {formatHour(routine.firstBite)} – {formatHour(routine.firstBite + routine.feedHours)}
            </span>
          )}
        </div>
        {slots.map((slot) => {
          const option = slot.options[routine.options[slot.id]]
          return (
            <div key={slot.id} className={styles.scheduleItem}>
              <span className={`${styles.scheduleLabel} ${slot.id === 'lunch' ? styles.tertiaryText : styles.mutedText}`}>
                <Icon name={slot.id === 'lunch' ? 'sunny' : 'bedtime'} size={18} />
                {slot.id === 'lunch' ? 'Lunch' : 'Dinner'} Arrival
              </span>
              <strong>{formatClock(toMinutes(routine.times[slot.id])).replace(/^0/, '')}</strong>
              <p>{option.label}</p>
              <span className={styles.packLine}>
                <Icon name="inventory_2" size={16} />
                {option.pack}
              </span>
            </div>
          )
        })}
      </div>
    </ReviewCard>
  )
}
