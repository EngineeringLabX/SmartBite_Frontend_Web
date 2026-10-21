import { formatPrice } from '@smartbite/ui'
import { useState } from 'react'
import styles from './Deliveries.module.css'

type Stage = 'Offered' | 'Heading to pickup' | 'On the way' | 'Delivered'

type Delivery = {
  id: string
  pickup: string
  dropoff: string
  distanceKm: number
  payout: number
  stage: Stage
  handlingNote?: string
}

// Mock data until the delivery API (Epic 6) is available
const INITIAL: Delivery[] = [
  { id: '1039', pickup: 'Green Leaf Kitchen, Colombo 03', dropoff: '24 Flower Rd, Colombo 07', distanceKm: 3.2, payout: 420, stage: 'Heading to pickup', handlingNote: 'Keep sealed: severe nut allergy' },
  { id: '1043', pickup: "Amma's Home Kitchen, Nugegoda", dropoff: '8 Station Ln, Kirulapone', distanceKm: 4.8, payout: 560, stage: 'Offered' },
]

const NEXT: Record<Stage, { stage: Stage; label: string } | null> = {
  Offered: { stage: 'Heading to pickup', label: 'Accept' },
  'Heading to pickup': { stage: 'On the way', label: 'Picked up' },
  'On the way': { stage: 'Delivered', label: 'Delivered' },
  Delivered: null,
}

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState(INITIAL)

  // Local only for now — will call the delivery API and share live location
  const advance = (id: string) =>
    setDeliveries((all) => all.map((d) => (d.id === id && NEXT[d.stage] ? { ...d, stage: NEXT[d.stage]!.stage } : d)))
  const decline = (id: string) => setDeliveries((all) => all.filter((d) => d.id !== id))

  return (
    <section className={styles.list}>
      {deliveries.length === 0 && <p className={styles.muted}>No deliveries right now. New requests will appear here.</p>}
      {deliveries.map((d) => {
        const next = NEXT[d.stage]
        return (
          <article key={d.id} className={styles.card}>
            <header className={styles.header}>
              <strong>Order #{d.id}</strong>
              <span className={styles.stage}>{d.stage}</span>
            </header>
            <ol className={styles.route}>
              <li>
                <span className={styles.label}>Pickup</span>
                {d.pickup}
              </li>
              <li>
                <span className={styles.label}>Drop-off</span>
                {d.dropoff}
              </li>
            </ol>
            {d.handlingNote && <p className={styles.note}>⚠ {d.handlingNote}</p>}
            <p className={styles.muted}>
              {d.distanceKm} km · earn {formatPrice(d.payout)}
            </p>
            {next && (
              <div className={styles.actions}>
                {d.stage === 'Offered' && (
                  <button type="button" className={styles.secondary} onClick={() => decline(d.id)}>
                    Decline
                  </button>
                )}
                <button type="button" className={styles.primary} onClick={() => advance(d.id)}>
                  {next.label}
                </button>
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}
