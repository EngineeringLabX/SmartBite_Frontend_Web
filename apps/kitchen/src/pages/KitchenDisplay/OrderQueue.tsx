import { formatPrice } from '@smartbite/ui'
import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import type { Ticket, TicketAlert, TicketStatus } from './data'

type OrderQueueProps = {
  tickets: Ticket[]
  onAccept: (id: string) => void
  onDecline: (id: string) => void
  onPlated: (id: string) => void
}

const ALERT_ICON: Record<TicketAlert['tone'], string> = {
  danger: 'warning',
  info: 'monitor_heart',
  safe: 'eco',
  caution: 'block',
}

const COLUMNS: { status: TicketStatus; title: string; tone: 'amber' | 'blue' | 'green' }[] = [
  { status: 'New', title: 'Pending Acceptance', tone: 'amber' },
  { status: 'Preparing', title: 'Ongoing Prep', tone: 'blue' },
  { status: 'Ready', title: 'Completed Orders', tone: 'green' },
]

export function OrderQueue({ tickets, onAccept, onDecline, onPlated }: OrderQueueProps) {
  const liveCount = tickets.filter((t) => t.status !== 'Ready').length

  return (
    <section aria-labelledby="queue-title">
      <div className={styles.queueHeader}>
        <div className={styles.queueTitleRow}>
          <h2 id="queue-title" className={styles.queueTitle}>
            Live Kitchen Orders Queue
          </h2>
          <span className={styles.liveBadge}>{liveCount} Live Tickets</span>
        </div>
        <span className={styles.refreshNote}>
          <span className={styles.onlineDot} />
          Auto-refresh every 15s
        </span>
      </div>

      <div className={styles.columns}>
        {COLUMNS.map(({ status, title, tone }) => {
          const column = tickets.filter((t) => t.status === status)
          const countLabel = status === 'New' ? `${column.length} Orders` : status === 'Preparing' ? `${column.length} Active` : `${column.length} Fulfilled`

          return (
            <section key={status} className={`${styles.column} ${styles[`column_${tone}`]}`}>
              <header className={styles.columnHeader}>
                <h3 className={styles.columnTitle}>
                  <span className={`${styles.columnDot} ${styles[`dot_${tone}`]}`} />
                  {title}
                </h3>
                <span className={`${styles.countPill} ${styles[`countPill_${tone}`]}`}>{countLabel}</span>
              </header>

              {column.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onAccept={() => onAccept(ticket.id)}
                  onDecline={() => onDecline(ticket.id)}
                  onPlated={() => onPlated(ticket.id)}
                />
              ))}
              {column.length === 0 && <p className={styles.empty}>No orders</p>}
            </section>
          )
        })}
      </div>
    </section>
  )
}

type TicketCardProps = {
  ticket: Ticket
  onAccept: () => void
  onDecline: () => void
  onPlated: () => void
}

function TicketCard({ ticket, onAccept, onDecline, onPlated }: TicketCardProps) {
  const { status, alert } = ticket

  return (
    <article className={`${styles.ticket} ${styles[`ticket_${status}`]}`}>
      <header className={styles.ticketTop}>
        <div>
          <div className={styles.ticketTitle}>
            <strong>#{ticket.id}</strong>
            <span>{ticket.guest}</span>
          </div>
          <p className={styles.ticketMeta}>{ticket.meta}</p>
        </div>
        <TicketChip ticket={ticket} />
      </header>

      <div className={styles.ticketItems}>
        <span>{ticket.items.join(', ')}</span>
        <strong>{formatPrice(ticket.total)}</strong>
      </div>

      {alert && (
        <p className={`${styles.alert} ${styles[`alert_${alert.tone}`]}`}>
          <Icon name={ALERT_ICON[alert.tone]} size={16} />
          {alert.text}
        </p>
      )}

      {status === 'New' && (
        <div className={styles.actionRow}>
          <button type="button" className={styles.buttonGhost} onClick={onDecline}>
            Decline
          </button>
          <button type="button" className={styles.buttonPrimary} onClick={onAccept}>
            Accept &amp; Prep
          </button>
        </div>
      )}

      {status === 'Preparing' && (
        <>
          <div className={styles.progressLabelRow}>
            <span>Cooking Progress</span>
            <strong className={styles.progressText}>{progressLabel(ticket)}</strong>
          </div>
          <div className={styles.progressTrack} role="presentation">
            <div className={styles.progressFillBlue} style={{ width: `${progressPercent(ticket)}%` }} />
          </div>
          <button type="button" className={styles.buttonSuccess} onClick={onPlated}>
            <Icon name="check_circle" size={18} />
            Mark Plated &amp; Ready
          </button>
        </>
      )}

      {status === 'Ready' && (ticket.footnote || ticket.rating) && (
        <div className={styles.footnoteRow}>
          <span>{ticket.footnote}</span>
          {ticket.rating && (
            <span className={styles.rating}>
              <Icon name="star" size={14} />
              {ticket.rating} Rating
            </span>
          )}
        </div>
      )}
    </article>
  )
}

function TicketChip({ ticket }: { ticket: Ticket }) {
  if (ticket.status === 'New') {
    return ticket.alert?.tone === 'danger' ? (
      <span className={`${styles.chip} ${styles.chipWarn}`}>Action Required</span>
    ) : (
      <span className={`${styles.chip} ${styles.chipNeutral}`}>Pending</span>
    )
  }

  if (ticket.status === 'Preparing') {
    return <span className={`${styles.chip} ${styles.chipInfo}`}>{minutesLeft(ticket)}m left</span>
  }

  return (
    <span className={`${styles.chip} ${styles.chipGood}`}>
      <Icon name="done_all" size={14} />
      {ticket.handoff ?? 'Ready'}
    </span>
  )
}

function minutesLeft(ticket: Ticket) {
  return Math.max(ticket.prepMinutes - ticket.cookedMinutes, 0)
}

function progressPercent(ticket: Ticket) {
  return Math.min(Math.round((ticket.cookedMinutes / ticket.prepMinutes) * 100), 100)
}

function progressLabel(ticket: Ticket) {
  return `${progressPercent(ticket)}% (${ticket.cookedMinutes}/${ticket.prepMinutes} min)`
}
