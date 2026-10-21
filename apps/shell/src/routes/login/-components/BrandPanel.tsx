import { Link } from '@tanstack/react-router'
import { APP_NAME } from '../../../constants'
import styles from '../login.module.css'

export function BrandPanel() {
  return (
    <aside className={styles.brand}>
      <svg className={styles.shapes} viewBox="0 0 430 655" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="235" cy="85" r="300" fill="#0e2d4a" />
        <circle cx="235" cy="85" r="240" fill="#13202e" />
        <line x1="150" y1="410" x2="250" y2="590" stroke="#0d5d93" strokeWidth="86" strokeLinecap="round" />
        <line x1="285" y1="410" x2="385" y2="590" stroke="#0d5d93" strokeWidth="86" strokeLinecap="round" />
        <line x1="200" y1="500" x2="250" y2="590" stroke="#0a3f66" strokeWidth="86" strokeLinecap="round" />
        <line x1="335" y1="500" x2="385" y2="590" stroke="#0a3f66" strokeWidth="86" strokeLinecap="round" />
        <circle cx="100" cy="568" r="40" fill="#0d6fae" />
      </svg>

      <div className={styles.brandContent}>
        <h2>Welcome to {APP_NAME}</h2>
        <p>Personalised, allergen-safe meals from restaurants and home-chefs, guided by AI that knows your wellness goals.</p>
        <Link to="/" className={styles.learnMore}>
          Learn More
        </Link>
      </div>
    </aside>
  )
}
