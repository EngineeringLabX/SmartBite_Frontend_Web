import { createFileRoute } from '@tanstack/react-router'
import { ProfileSection } from './-components/ProfileSection'
import styles from './profile.module.css'

export const Route = createFileRoute('/_app/_authenticated/profile/')({
  component: Profile,
})

function Profile() {
  return (
    <section className={styles.page}>
      <h1>Wellness Profile</h1>
      <div className={styles.sections}>
        <ProfileSection title="Dietary preferences" description="Vegan, keto, halal and other eating styles." />
        <ProfileSection title="Allergies & intolerances" description="Allergens and how severe each one is." />
        <ProfileSection title="Wellness goals" description="Calorie and macro targets, medical needs." />
      </div>
    </section>
  )
}
