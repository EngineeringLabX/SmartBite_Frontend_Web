import { useAuth } from '@smartbite/auth'
import { useState } from 'react'
import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import { KitchenFooter } from './KitchenFooter'
import { KitchenHeader } from './KitchenHeader'
import { INITIAL_TICKETS, type Ticket } from './data'
import { OrderQueue } from './OrderQueue'
import { PerformanceSummary } from './PerformanceSummary'
import { SafeCoreBar } from './SafeCoreBar'
import { StatCards } from './StatCards'

export default function KitchenDisplay() {
  // Local only for now — will sync with the kitchen operations API
  const [tickets, setTickets] = useState(INITIAL_TICKETS)

  const updateTicket = (id: string, change: (ticket: Ticket) => Ticket) =>
    setTickets((all) => all.map((t) => (t.id === id ? change(t) : t)))

  const accept = (id: string) => updateTicket(id, (t) => ({ ...t, status: 'Preparing', cookedMinutes: 0 }))
  const plated = (id: string) => updateTicket(id, (t) => ({ ...t, status: 'Ready', cookedMinutes: t.prepMinutes }))
  const decline = (id: string) => setTickets((all) => all.filter((t) => t.id !== id))

  return (
    <div className={styles.dashboard}>
      <KitchenHeader />

      <main className={styles.main}>
        <Hero />
        <StatCards />
        <PerformanceSummary />
        <OrderQueue tickets={tickets} onAccept={accept} onDecline={decline} onPlated={plated} />
        <SafeCoreBar />
      </main>

      <KitchenFooter />
    </div>
  )
}

function Hero() {
  const { user } = useAuth()

  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.heroTitle}>
          Welcome back, <span className={styles.heroName}>{user?.name ?? 'Demo Restaurant'}</span>
        </h1>
        <p className={styles.heroSub}>
          Here&apos;s how your kitchen is doing today across orders, allergen safety checks, and culinary workflows.
        </p>
      </div>
      <div className={styles.heroActions}>
        <button type="button" className={styles.buttonOutline}>
          <Icon name="print" size={18} />
          Print All Tickets
        </button>
        <button type="button" className={styles.buttonOutline}>
          <Icon name="tune" size={18} />
          Station Routing
        </button>
        <button type="button" className={styles.buttonPrimaryLarge}>
          <Icon name="add_circle" size={18} />
          New Walk-in Order
        </button>
      </div>
    </section>
  )
}
