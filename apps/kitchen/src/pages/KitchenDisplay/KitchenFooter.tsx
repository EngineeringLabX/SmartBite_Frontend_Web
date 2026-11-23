import styles from './KitchenDisplay.module.css'

export function KitchenFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>
          <strong>SmartBite AI Ops Central</strong>
          <span className={styles.footerDot}>•</span>
          HACCP &amp; Food Allergen Protocol Level 3 Certified
        </span>
        <span>
          System Latency: 12ms (Optimal) • © {new Date().getFullYear()} SmartBite AI Technologies Inc.
        </span>
      </div>
    </footer>
  )
}
