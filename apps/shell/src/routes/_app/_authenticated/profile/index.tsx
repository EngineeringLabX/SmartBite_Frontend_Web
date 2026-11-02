import { useAuth } from '@smartbite/auth'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AllergiesSection } from './-components/AllergiesSection'
import { DietarySection } from './-components/DietarySection'
import { HealthSection } from './-components/HealthSection'
import { Icon } from './-components/Icon'
import { MacrosSection } from './-components/MacrosSection'
import { ProfileHero, type SaveStatus } from './-components/ProfileHero'
import { INITIAL_ALLERGENS, type Allergen } from './-components/profileData'
import { SafetySection } from './-components/SafetySection'
import { TasteSection } from './-components/TasteSection'
import { WellnessShell } from './-components/WellnessShell'
import styles from './profile.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/')({
  component: Profile,
})

function Profile() {
  const { user } = useAuth()
  const [allergens, setAllergens] = useState<Allergen[]>(INITIAL_ALLERGENS)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  // saving -> saved -> idle. There is no profile API yet, so nothing is sent anywhere
  useEffect(() => {
    if (saveStatus === 'idle') return
    const timer = setTimeout(
      () => setSaveStatus(saveStatus === 'saving' ? 'saved' : 'idle'),
      saveStatus === 'saving' ? 600 : 1900,
    )
    return () => clearTimeout(timer)
  }, [saveStatus])

  const name = user?.name ?? ''

  return (
    <WellnessShell>
      <ProfileHero
        name={name}
        allergens={allergens}
        saveStatus={saveStatus}
        onSave={() => setSaveStatus('saving')}
      />
      <div className={styles.columns}>
        <div className={styles.column}>
          <DietarySection />
          <AllergiesSection allergens={allergens} onChange={setAllergens} />
          <MacrosSection />
          <HealthSection />
        </div>
        <div className={styles.column}>
          <TasteSection />
          <SafetySection firstName={name.split(' ')[0]} />
        </div>
      </div>
      {saveStatus !== 'idle' && (
        <div className={styles.toast} role="status">
          <Icon name="check_circle" size={22} className={styles.toastIcon} />
          <div>
            <strong>Profile Synchronized</strong>
            <span>SmartBite AI Chef updated your meal &amp; allergen rules.</span>
          </div>
        </div>
      )}
    </WellnessShell>
  )
}
