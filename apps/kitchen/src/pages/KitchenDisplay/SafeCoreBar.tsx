import styles from './KitchenDisplay.module.css'
import { Icon } from './Icon'
import { SAFECORE_STATIONS } from './data'

export function SafeCoreBar() {
  return (
    <section className={styles.safeCore}>
      <div className={styles.safeCoreInfo}>
        <span className={styles.safeCoreIcon}>
          <Icon name="verified_user" size={22} />
        </span>
        <div>
          <p className={styles.safeCoreTitle}>SafeCore™ AI Dietary Verification System Active</p>
          <p className={styles.safeCoreSub}>
            Every ticket cross-checked against guest medical profiles &amp; allergen tags in real time.
          </p>
        </div>
      </div>

      <div className={styles.safeCoreStations}>
        {SAFECORE_STATIONS.map((station) => (
          <div key={station.label} className={styles.stationMeter}>
            <div className={styles.stationLabelRow}>
              <span>{station.label}</span>
              <strong className={styles[`text_${station.tone}`]}>{station.percent}%</strong>
            </div>
            <div className={styles.stationTrack} role="presentation">
              <div className={styles[`fill_${station.tone}`]} style={{ width: `${station.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
