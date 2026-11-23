import styles from '../allergies.module.css'

/** Small diagram: this stage's profile feeds the SafeCore filter, which feeds the macro targets of stage 3 */
export function SafeCorePipeline() {
  return (
    <section className={styles.pipeline}>
      <div className={styles.pipelineText}>
        <span className={styles.pipelineOverline}>Dynamic Rule Execution</span>
        <h3>Real-Time SafeCore™ Recipe Filtering</h3>
        <p>
          Every recipe generated in Steps 3 through 5 will be subjected to 47 clinical cross-referencing checkpoints
          against your allergy profile before arriving in your meal plan.
        </p>
      </div>
      <svg
        className={styles.pipelineSvg}
        viewBox="0 0 380 90"
        role="img"
        aria-label="Your step 2 profile passes through the SafeCore filter before reaching your step 3 macro targets"
      >
        <path d="M50 45H330" stroke="var(--p-outline-variant)" strokeDasharray="4 4" strokeWidth="2" />
        <path d="M50 45H190" stroke="var(--p-tertiary)" strokeWidth="2" />

        <circle cx="50" cy="45" r="22" fill="var(--p-primary)" />
        <text x="50" y="49" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">
          INPUT
        </text>
        <text x="50" y="84" fill="var(--p-muted)" fontSize="10" textAnchor="middle">
          Step 2 Profile
        </text>

        <circle cx="190" cy="45" r="30" fill="var(--p-tertiary)" />
        <text x="190" y="49" fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle">
          SafeCore™
        </text>
        <text x="190" y="88" fill="var(--p-tertiary)" fontSize="10" fontWeight="600" textAnchor="middle">
          Enforced
        </text>

        <circle cx="330" cy="45" r="22" fill="var(--p-highest)" />
        <text x="330" y="49" fill="var(--p-fg)" fontSize="9" fontWeight="700" textAnchor="middle">
          MACROS
        </text>
        <text x="330" y="84" fill="var(--p-muted)" fontSize="10" textAnchor="middle">
          Step 3 Target
        </text>
      </svg>
    </section>
  )
}
