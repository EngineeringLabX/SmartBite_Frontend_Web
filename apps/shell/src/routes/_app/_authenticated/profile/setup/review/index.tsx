import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Icon } from '../../-components/Icon'
import { SetupShell } from '../-components/SetupShell'
import { MEAL_SLOTS, SETUP_STEPS, type SetupStep } from '../-components/setupData'
import { useSetup, type SetupValues } from '../-components/setupState'
import { gramsOf, KETO_CARB_CAP } from '../nutrition/-components/nutritionMath'
import { toMinutes } from '../routine/-components/timeUtils'
import setup from '../setup.module.css'
import { ReviewSidebar } from './-components/ReviewSidebar'
import { AllergenCard, DietaryCard, MacroCard, ScheduleCard } from './-components/SummaryCards'
import styles from './review.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/setup/review/')({
  component: ReviewSetup,
})

// Stage 5 of the customer profile setup
const STEP = 4

type Issue = { text: string; to: NonNullable<SetupStep['to']> }

/** Conflicts between stages that the customer should fix before launching */
function findIssues({ diets, nutrition, routine }: SetupValues): Issue[] {
  const issues: Issue[] = []

  const carbs = gramsOf(nutrition.calories, nutrition.split.carbs, 'carbs')
  if (diets.includes('keto') && carbs > KETO_CARB_CAP) {
    issues.push({
      text: `Your macro split allows ${carbs}g net carbs a day, above the ${KETO_CARB_CAP}g Keto cap.`,
      to: '/profile/setup/nutrition',
    })
  }

  if (routine.fasting) {
    const start = routine.firstBite * 60
    const end = (routine.firstBite + routine.feedHours) * 60
    const outside = MEAL_SLOTS.filter((slot) => {
      const time = toMinutes(routine.times[slot.id])
      return time < start || time + slot.minutes > end
    })
    if (outside.length) {
      issues.push({
        text: `${outside.map((slot) => slot.label).join(' and ')} ${outside.length === 1 ? 'falls' : 'fall'} outside your eating window.`,
        to: '/profile/setup/routine',
      })
    }
  }

  return issues
}

function ReviewSetup() {
  const values = useSetup()
  const navigate = useNavigate()
  const [launching, setLaunching] = useState(false)
  const issues = findIssues(values)

  // There is no profile API yet: show the confirmation, then open the menu
  useEffect(() => {
    if (!launching) return
    const timer = setTimeout(() => navigate({ to: '/menu' }), 1400)
    return () => clearTimeout(timer)
  }, [launching, navigate])

  return (
    <SetupShell currentStep={STEP}>
      <div className={setup.card}>
        <div className={setup.intro}>
          <div>
            <div className={styles.stage}>
              <span className={styles.finalChip}>
                <Icon name="verified" size={14} filled />
                Final Clinical Verification
              </span>
              <span className={styles.stageDot}>•</span>
              <span className={styles.stageCount}>
                Step {STEP + 1} of {SETUP_STEPS.length}
              </span>
            </div>
            <h1 className={setup.title}>Review Your Clinical Nutrition &amp; Culinary Profile</h1>
            <p className={setup.lead}>
              {issues.length
                ? `Almost there! ${issues.length === 1 ? 'One rule needs' : `${issues.length} rules need`} a second look before SmartBite AI curates your personalized restaurant and chef menu.`
                : 'Everything looks aligned! Verify your rules before SmartBite AI curates your personalized restaurant and chef menu.'}
            </p>
          </div>
          <span className={styles.online}>
            <span className={styles.ping} />
            SafeCore™ Engine Online
          </span>
        </div>

        {issues.length > 0 && (
          <div className={styles.issues} role="status">
            <Icon name="warning" size={22} className={styles.issuesIcon} />
            <ul>
              {issues.map((issue) => (
                <li key={issue.text}>
                  {issue.text}{' '}
                  <Link to={issue.to} className={styles.issueLink}>
                    Fix it
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.main}>
            <DietaryCard diets={values.diets} constraints={values.constraints} />
            <AllergenCard allergens={values.allergens} customTags={values.customTags} crossContact={values.crossContact} />
            <MacroCard nutrition={values.nutrition} />
            <ScheduleCard routine={values.routine} />
          </div>
          <ReviewSidebar
            allergens={values.allergens}
            customTags={values.customTags}
            crossContact={values.crossContact}
            epiPen={values.epiPen}
          />
        </div>

        <div className={setup.actions}>
          <Link to="/profile/setup/routine" className={styles.back}>
            <Icon name="arrow_back" size={18} />
            Back to Routine
          </Link>
          <button type="button" className={styles.launch} disabled={launching} onClick={() => setLaunching(true)}>
            {launching ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Securing SafeCore™ Baseline...
              </>
            ) : (
              <>
                Confirm &amp; Launch Smart Catalog
                <Icon name="arrow_forward" size={20} />
              </>
            )}
          </button>
        </div>
      </div>

      {launching && (
        <div className={styles.toast} role="status">
          <Icon name="task_alt" size={24} className={styles.toastIcon} />
          <div>
            <strong>Profile Verified &amp; Secured</strong>
            <span>Compiling personalized menus with SafeCore™ filters...</span>
          </div>
        </div>
      )}
    </SetupShell>
  )
}
