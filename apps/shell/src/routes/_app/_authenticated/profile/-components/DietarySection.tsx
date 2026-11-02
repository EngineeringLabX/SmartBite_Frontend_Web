import { useState } from 'react'
import styles from '../profile.module.css'
import { Icon } from './Icon'
import { CHEF_DIRECTIVES, EATING_STYLES, INITIAL_EATING_STYLES } from './profileData'
import { ProfileSection } from './ProfileSection'

const STRICTNESS_MODES = ['Strict Zero-Cross', 'Flexible Lifestyle']

export function DietarySection() {
  const [strictness, setStrictness] = useState(STRICTNESS_MODES[0])
  const [selected, setSelected] = useState(INITIAL_EATING_STYLES)
  const [directives, setDirectives] = useState(CHEF_DIRECTIVES)

  const toggle = (style: string) =>
    setSelected((current) =>
      current.includes(style) ? current.filter((s) => s !== style) : [...current, style],
    )

  return (
    <ProfileSection
      icon="dining"
      iconTone="blue"
      title="Dietary Preferences & Styles"
      description="Calibrate nutritional framework for personalized autonomous recipe & dining generation"
      aside={<span className={styles.stepPill}>Step 1 of 4</span>}
    >
      <div className={styles.strictness}>
        <div>
          <span className={styles.labelLg}>Protocol Adherence Strictness</span>
          <p className={`${styles.small} ${styles.muted}`}>
            Controls whether recipes allow trace ingredients or optional flexitarian suggestions
          </p>
        </div>
        <div className={styles.segmented}>
          {STRICTNESS_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={strictness === mode}
              className={strictness === mode ? styles.segmentActive : styles.segment}
              onClick={() => setStrictness(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.overline}>Active Eating Styles (Tap to toggle)</span>
        <div className={styles.tags}>
          {EATING_STYLES.map((style) => {
            const isOn = selected.includes(style)
            return (
              <button
                key={style}
                type="button"
                aria-pressed={isOn}
                className={isOn ? styles.tagOn : styles.tagOff}
                onClick={() => toggle(style)}
              >
                {isOn ? <Icon name="check" size={16} /> : <span>+</span>}
                {style}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.labelMd} htmlFor="ai-chef-notes">
          <Icon name="neurology" size={16} className={styles.primary} />
          Special Culinary Directives for SmartBite AI Engine
        </label>
        <div className={styles.textareaWrap}>
          <textarea
            id="ai-chef-notes"
            className={styles.textarea}
            rows={3}
            placeholder="E.g., Prioritize extra virgin olive oil over refined seed oils, strictly avoid all trans-fats, favor wild-caught seafood."
            value={directives}
            onChange={(e) => setDirectives(e.target.value)}
          />
          <span className={styles.promptTag}>Prompt Active</span>
        </div>
      </div>
    </ProfileSection>
  )
}
