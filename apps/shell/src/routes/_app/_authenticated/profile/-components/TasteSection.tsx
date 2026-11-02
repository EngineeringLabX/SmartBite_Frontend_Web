import { useState } from 'react'
import styles from '../profile.module.css'
import { Icon } from './Icon'
import { CUISINES, DISLIKED_INGREDIENTS, SPICE_LEVELS, STAR_INGREDIENTS } from './profileData'
import { ProfileSection } from './ProfileSection'

export function TasteSection() {
  const [spice, setSpice] = useState(3)

  return (
    <ProfileSection
      compact
      icon="auto_awesome"
      iconTone="tint"
      title="Taste & Flavor Profile"
      description="Shapes AI chef recipe creativity"
    >
      <div className={styles.spice}>
        <div className={styles.spiceHead}>
          <label htmlFor="spice-tolerance">Spice Tolerance</label>
          <span>
            {SPICE_LEVELS[spice]} <em>{'•'.repeat(spice)}</em>
          </span>
        </div>
        <input
          id="spice-tolerance"
          type="range"
          min={0}
          max={SPICE_LEVELS.length - 1}
          value={spice}
          onChange={(e) => setSpice(Number(e.target.value))}
        />
        <div className={styles.spiceScale}>
          <span>Mild (0)</span>
          <span>Balanced (3)</span>
          <span>Ghost Pepper (5)</span>
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.labelMd}>Top Loved Cuisines</span>
        <div className={styles.chips}>
          {CUISINES.map((cuisine) => (
            <span key={cuisine} className={styles.cuisineChip}>
              <Icon name="favorite" size={15} className={styles.error} />
              {cuisine}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.labelMd}>Star Ingredients (Prioritized)</span>
        <div className={styles.chips}>
          {STAR_INGREDIENTS.map((ingredient) => (
            <span key={ingredient} className={styles.starChip}>
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.labelMd}>Disliked Ingredients (Excluded)</span>
        <div className={styles.chips}>
          {DISLIKED_INGREDIENTS.map((ingredient) => (
            <span key={ingredient} className={styles.dislikedChip}>
              <Icon name="remove_circle_outline" size={13} className={styles.error} />
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </ProfileSection>
  )
}
