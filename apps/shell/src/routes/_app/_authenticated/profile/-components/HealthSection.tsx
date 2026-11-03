import { useState } from 'react'
import styles from '../profile.module.css'
import { Icon } from './Icon'
import { CONDITIONS } from './profileData'
import { ProfileSection } from './ProfileSection'

export function HealthSection() {
  const [sensorsOn, setSensorsOn] = useState(true)

  return (
    <ProfileSection
      icon="vital_signs"
      iconTone="tint"
      title="Health Concerns & Medical Safeguards"
      description="Live parameters synced with Apple Health & Dexcom CGM continuous sensor"
      aside={
        <span className={styles.normalChip}>
          <span className={styles.normalDot} />
          Biomarkers Normal
        </span>
      }
    >
      <div className={styles.conditions}>
        {CONDITIONS.map((condition) => (
          <div key={condition.name} className={styles.condition}>
            <div>
              <div className={styles.conditionHead}>
                <strong>{condition.name}</strong>
                <Icon name={condition.icon} size={18} className={styles.primary} />
              </div>
              <p className={`${styles.small} ${styles.muted}`}>{condition.description}</p>
            </div>
            <div className={styles.conditionFoot}>
              <span>{condition.label}</span>
              <strong className={styles[condition.tone]}>{condition.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sensors}>
        <div className={styles.sensorsText}>
          <Icon name="devices_wearables" size={24} className={styles.primary} />
          <div>
            <span className={styles.labelLg}>Connected Health Sensors</span>
            <p className={`${styles.small} ${styles.muted}`}>Continuous Glucose Monitor (CGM) &amp; Apple Health Biometrics</p>
          </div>
        </div>
        <label className={styles.switch}>
          <input
            type="checkbox"
            aria-label="Connected Health Sensors"
            checked={sensorsOn}
            onChange={(e) => setSensorsOn(e.target.checked)}
          />
          <span />
        </label>
      </div>
    </ProfileSection>
  )
}
