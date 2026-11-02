import styles from '../profile.module.css'
import { Icon } from './Icon'
import { COMPLIANCE_IMAGE, SAFETY_GUARDS } from './profileData'
import { ProfileSection } from './ProfileSection'

export function SafetySection({ firstName }: { firstName?: string }) {
  return (
    <ProfileSection
      compact
      icon="smart_toy"
      iconTone="solid"
      title="Autonomous AI Safety"
      description="Real-time proactive interceptors"
    >
      <div className={styles.guards}>
        {SAFETY_GUARDS.map((guard) => (
          <label key={guard.name} className={styles.guard}>
            <span>
              <strong>{guard.name}</strong>
              <span className={`${styles.small} ${styles.muted}`}>{guard.description}</span>
            </span>
            <input type="checkbox" defaultChecked />
          </label>
        ))}
      </div>

      <div className={styles.compliance}>
        <img src={COMPLIANCE_IMAGE} alt="Mediterranean bowl with salmon, avocado and quinoa" />
        <div>
          <Icon name="verified" className={styles.complianceIcon} />
          <span>Complies with 100% of {firstName}&apos;s Bio-Profile</span>
        </div>
      </div>
    </ProfileSection>
  )
}
