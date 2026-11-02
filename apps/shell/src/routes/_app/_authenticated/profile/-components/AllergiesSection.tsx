import { useEffect, useRef, useState, type FormEvent } from 'react'
import styles from '../profile.module.css'
import { Icon } from './Icon'
import { SEVERITIES, type Allergen, type Severity } from './profileData'
import { ProfileSection } from './ProfileSection'

type AllergiesSectionProps = {
  allergens: Allergen[]
  onChange: (allergens: Allergen[]) => void
}

export function AllergiesSection({ allergens, onChange }: AllergiesSectionProps) {
  const [adding, setAdding] = useState(false)

  return (
    <ProfileSection
      icon="health_and_safety"
      iconTone="red"
      title="Allergies & Intolerances"
      badge="Medical Priority"
      description="Automated camera scanner & restaurant API rejects all matching molecular profiles"
      aside={
        <button type="button" className={styles.addButton} onClick={() => setAdding(true)}>
          <Icon name="add_circle" size={16} />
          Add Allergen Filter
        </button>
      }
    >
      {allergens.some((a) => a.severity === 'Extreme') && (
        <div className={styles.emergency}>
          <Icon name="notification_important" className={styles.error} />
          <div>
            <div className={styles.emergencyHead}>
              <strong>EpiPen &amp; Anaphylaxis Protocol Active</strong>
              <span>Emergency Contact: Dr. Liam Vance</span>
            </div>
            <p className={`${styles.small} ${styles.muted}`}>
              SmartBite SafeScanner triggers loud red visual alarms and haptic lockout on dishes containing identified
              tree nut or peanut protein matrices.
            </p>
          </div>
        </div>
      )}

      <div className={styles.allergenGrid}>
        {allergens.map((allergen) => (
          <div key={allergen.id} className={styles.allergen}>
            <div className={styles.allergenTop}>
              <div className={styles.allergenName}>
                <span className={`${styles.allergenIcon} ${styles[`severity${allergen.severity}`]}`}>
                  <Icon name={SEVERITIES[allergen.severity].icon} />
                </span>
                <div>
                  <h3>{allergen.name}</h3>
                  <span>{allergen.detail}</span>
                </div>
              </div>
              <span className={`${styles.severityBadge} ${styles[`severity${allergen.severity}`]}`}>
                {SEVERITIES[allergen.severity].label}
              </span>
            </div>
            <div className={styles.allergenFoot}>
              <span className={`${styles.allergenNote} ${styles[allergen.noteTone]}`}>
                {allergen.noteIcon && <Icon name={allergen.noteIcon} size={16} />}
                {allergen.note}
              </span>
              <button
                type="button"
                className={styles.removeButton}
                aria-label={`Remove ${allergen.name} filter`}
                onClick={() => onChange(allergens.filter((a) => a.id !== allergen.id))}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {adding && (
        <AddAllergenDialog
          onClose={() => setAdding(false)}
          onAdd={(allergen) => {
            onChange([...allergens, allergen])
            setAdding(false)
          }}
        />
      )}
    </ProfileSection>
  )
}

type AddAllergenDialogProps = {
  onClose: () => void
  onAdd: (allergen: Allergen) => void
}

function AddAllergenDialog({ onClose, onAdd }: AddAllergenDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name')).trim()
    if (!name) return
    onAdd({
      id: crypto.randomUUID(),
      name,
      detail: 'Custom user rule',
      severity: String(form.get('severity')) as Severity,
      note: 'Active guard protection',
      noteIcon: 'verified_user',
      noteTone: 'primary',
    })
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <form className={styles.dialogForm} onSubmit={onSubmit}>
        <div className={styles.dialogHead}>
          <h3>Add Allergen Filter</h3>
          <button type="button" className={styles.dialogClose} aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <label className={styles.dialogField}>
          Ingredient or Compound
          <input name="name" required autoFocus placeholder="E.g., Sesame Seed, Gluten, Mustard" />
        </label>
        <label className={styles.dialogField}>
          Severity Classification
          <select name="severity" defaultValue="Extreme">
            {(Object.keys(SEVERITIES) as Severity[]).map((severity) => (
              <option key={severity} value={severity}>
                {SEVERITIES[severity].option}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.confirmButton}>
            Attach to Guard
          </button>
        </div>
      </form>
    </dialog>
  )
}
