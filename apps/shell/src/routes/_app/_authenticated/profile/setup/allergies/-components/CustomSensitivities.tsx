import { useState, type FormEvent } from 'react'
import { Icon } from '../../../-components/Icon'
import styles from '../allergies.module.css'

type CustomSensitivitiesProps = {
  tags: string[]
  onChange: (tags: string[]) => void
}

/** Free-text sensitivities: compounds, spices or aversions not in the standard catalog */
export function CustomSensitivities({ tags, onChange }: CustomSensitivitiesProps) {
  const [draft, setDraft] = useState('')

  const addTag = (event: FormEvent) => {
    event.preventDefault()
    const tag = draft.trim()
    if (!tag) return
    // Skip duplicates regardless of case
    if (!tags.some((t) => t.toLowerCase() === tag.toLowerCase())) onChange([...tags, tag])
    setDraft('')
  }

  return (
    <section className={`${styles.panel} ${styles.customPanel}`} aria-labelledby="custom-title">
      <div>
        <h3 id="custom-title" className={styles.panelTitle}>
          <Icon name="biotech" size={20} className={styles.primaryText} />
          Custom Sensitivities &amp; Genetic Markers
        </h3>
        <p className={styles.panelHint}>
          Type specific chemical compounds, spices, or sensory aversion genes (e.g., OR6A2 cilantro soap scent gene).
        </p>

        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() => onChange(tags.filter((t) => t !== tag))}
                >
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <form className={styles.tagForm} onSubmit={addTag}>
          <Icon name="search" size={20} className={styles.tagSearch} />
          <input
            type="text"
            value={draft}
            maxLength={60}
            aria-label="Add a specific ingredient"
            placeholder="Add specific ingredient (e.g. Nightshades, MSG, Mustard Seed, Aspartame)..."
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" disabled={!draft.trim()}>
            Add Tag
          </button>
        </form>
      </div>

      <div className={styles.verified}>
        <span>
          <Icon name="verified" size={18} className={styles.tertiaryText} />
          Verified by USDA Nutrition Database &amp; SafeCore™ AI
        </span>
      </div>
    </section>
  )
}
