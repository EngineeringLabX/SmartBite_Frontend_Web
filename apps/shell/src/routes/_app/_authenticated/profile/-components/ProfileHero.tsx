import { useState } from 'react'
import styles from '../profile.module.css'
import { Icon } from './Icon'
import type { Allergen } from './profileData'

export type SaveStatus = 'idle' | 'saving' | 'saved'

const SAVE_BUTTON: Record<SaveStatus, { icon: string; label: string }> = {
  idle: { icon: 'save', label: 'Save Changes' },
  saving: { icon: 'refresh', label: 'Saving...' },
  saved: { icon: 'done', label: 'Saved!' },
}

type ProfileHeroProps = {
  name: string
  allergens: Allergen[]
  saveStatus: SaveStatus
  onSave: () => void
}

export function ProfileHero({ name, allergens, saveStatus, onSave }: ProfileHeroProps) {
  const [syncing, setSyncing] = useState(true)
  const severeCount = allergens.filter((a) => a.severity === 'Extreme' || a.severity === 'High').length
  const save = SAVE_BUTTON[saveStatus]

  return (
    <div className={styles.hero}>
      <div className={styles.glowBlue} />
      <div className={styles.glowGreen} />

      <div className={styles.heroTop}>
        <div className={styles.identity}>
          <div className={styles.avatarTile}>
            <Icon name="clinical_notes" size={38} />
            <span className={styles.avatarShield} title="Active Bio-Guard Protocol">
              <Icon name="shield" size={14} />
            </span>
          </div>
          <div>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{name}</h1>
              <span className={styles.verifiedChip}>
                <Icon name="verified" size={14} className={styles.primary} />
                Entra ID Verified
              </span>
              <span className={styles.liveChip}>
                <span className={styles.liveDot} />
                Live Guard Shield Active
              </span>
            </div>
            <p className={styles.heroMeta}>
              Clinical Culinary Profile #SB-89241 • Continuous Guardian Active • Last Synced 12m ago via Dexcom CGM
            </p>
          </div>
        </div>

        <div className={styles.heroActions}>
          <button type="button" className={styles.softButton}>
            <Icon name="file_download" size={18} className={styles.secondary} />
            Export FHIR / PDF
          </button>
          <button
            type="button"
            className={`${styles.softButton} ${syncing ? styles.tertiary : styles.muted}`}
            onClick={() => setSyncing((on) => !on)}
          >
            <Icon name="sync" size={18} />
            {syncing ? 'AI Smart Sync Active' : 'AI Smart Sync Paused'}
          </button>
          <button type="button" className={styles.saveButton} onClick={onSave} disabled={saveStatus !== 'idle'}>
            <Icon name={save.icon} size={18} className={saveStatus === 'saving' ? styles.spin : undefined} />
            {save.label}
          </button>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <Icon name="local_fire_department" size={15} className={styles.primary} />
            Calorie Daily Target
          </span>
          <div className={styles.metricValue}>
            <strong>2,150</strong>
            <span className={styles.secondary}>kcal / day</span>
          </div>
          <span className={`${styles.small} ${styles.tertiary}`}>-100 kcal Lean Deficit</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <Icon name="dangerous" size={15} className={styles.error} />
            Active Allergen Blockers
          </span>
          <div className={styles.metricValue}>
            <strong className={styles.error}>
              {allergens.length} {allergens.length === 1 ? 'Rule' : 'Rules'}
            </strong>
            {severeCount > 0 && <span className={styles.severeTag}>{severeCount} Severe</span>}
          </div>
          <span className={`${styles.small} ${styles.muted}`}>Strict Zero Cross-Contam</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <Icon name="restaurant_menu" size={15} className={styles.tertiary} />
            Core Dietary Protocol
          </span>
          <div className={styles.metricValue}>
            <strong>Mediterranean</strong>
          </div>
          <span className={`${styles.small} ${styles.secondary}`}>+ Low-Glycemic Index Priority</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <Icon name="cardiology" size={15} className={styles.primary} />
            Target Biomarkers
          </span>
          <div className={styles.metricValue}>
            <strong>Cardio &amp; Gut</strong>
          </div>
          <span className={`${styles.small} ${styles.tertiary}`}>&lt; 1,800mg Sodium Limit</span>
        </div>
      </div>
    </div>
  )
}
