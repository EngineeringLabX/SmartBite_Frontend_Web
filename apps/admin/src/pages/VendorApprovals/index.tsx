import { useState } from 'react'
import styles from './VendorApprovals.module.css'

type Decision = 'Pending' | 'Approved' | 'Rejected'

type Application = {
  id: string
  business: string
  type: 'Restaurant' | 'Home-Chef'
  submitted: string
  documents: string
  decision: Decision
}

// Mock data until the vendor onboarding API (US-1.2, US-1.12) is available
const INITIAL: Application[] = [
  { id: 'v-301', business: 'Spice Route Home Kitchen', type: 'Home-Chef', submitted: 'Today', documents: 'Food handler cert, NIC', decision: 'Pending' },
  { id: 'v-298', business: 'The Green Fork', type: 'Restaurant', submitted: 'Yesterday', documents: 'Business reg., health permit', decision: 'Pending' },
  { id: 'v-295', business: 'Lanka Keto Co.', type: 'Restaurant', submitted: '2 days ago', documents: 'Business reg. (health permit missing)', decision: 'Pending' },
]

export default function VendorApprovals() {
  const [applications, setApplications] = useState(INITIAL)

  // Local only for now — will call the admin API and notify the vendor
  const decide = (id: string, decision: Decision) =>
    setApplications((all) => all.map((a) => (a.id === id ? { ...a, decision } : a)))

  return (
    <section>
      <h2 className={styles.heading}>Vendor approvals</h2>
      <p className={styles.muted}>Vendors can only go live after their documents are reviewed.</p>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Business</th>
              <th>Type</th>
              <th>Submitted</th>
              <th>Documents</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.business}</strong>
                </td>
                <td>{a.type}</td>
                <td>{a.submitted}</td>
                <td>{a.documents}</td>
                <td>
                  {a.decision === 'Pending' ? (
                    <div className={styles.actions}>
                      <button type="button" className={styles.approve} onClick={() => decide(a.id, 'Approved')}>
                        Approve
                      </button>
                      <button type="button" className={styles.reject} onClick={() => decide(a.id, 'Rejected')}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={a.decision === 'Approved' ? styles.approved : styles.rejected}>{a.decision}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
