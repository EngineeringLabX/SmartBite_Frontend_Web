import { useAuth } from '@smartbite/auth'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Icon } from '../../-components/Icon'
import { SETUP_STEPS } from './setupData'
import styles from './SetupShell.module.css'

type SetupShellProps = {
  /** Index of the stage being filled in */
  currentStep: number
  children: ReactNode
}

/** Page chrome for the profile setup flow: header with stage stepper, content area and footer */
export function SetupShell({ currentStep, children }: SetupShellProps) {
  const { user } = useAuth()

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandRow}>
            <Link to="/" className={styles.brand}>
              <span className={styles.logo}>
                <Icon name="psychology_alt" size={20} />
              </span>
              <span className={styles.brandName}>
                SmartBite<em>AI</em>
              </span>
            </Link>
            <span className={styles.crumb}>
              <span className={styles.crumbSlash}>/</span>
              Setup &amp; Clinical Nutrition Profile
            </span>
          </div>
          <div className={styles.tools}>
            {user?.email && (
              <span className={styles.account}>
                <span className={styles.avatar}>
                  <Icon name="person" size={18} />
                </span>
                {user.email}
              </span>
            )}
            {/* Choices are kept in page state until there is a profile API to save them to */}
            <Link to="/profile" className={styles.exit}>
              <Icon name="logout" size={18} />
              Save &amp; Exit
            </Link>
          </div>
        </div>

        <div className={styles.stepBar}>
          <div className={styles.stepInner}>
            <ol className={styles.steps}>
              {SETUP_STEPS.map((step, index) => {
                const isCurrent = index === currentStep
                const state = isCurrent ? styles.stepActive : index < currentStep ? styles.stepDone : ''
                const content = (
                  <>
                    <span className={styles.stepNumber}>
                      {index < currentStep ? <Icon name="check" size={12} /> : index + 1}
                    </span>
                    {step.label}
                  </>
                )
                return (
                  <li key={step.id} className={`${styles.step} ${state}`} aria-current={isCurrent ? 'step' : undefined}>
                    {/* Stages without a screen yet are shown but not linked */}
                    {step.to && !isCurrent ? (
                      <Link to={step.to} className={styles.stepLink}>
                        {content}
                      </Link>
                    ) : (
                      <span className={styles.stepLink}>{content}</span>
                    )}
                  </li>
                )
              })}
            </ol>
            <div className={styles.progress} aria-hidden="true">
              {SETUP_STEPS.map((step, index) => (
                <span
                  key={step.id}
                  className={index < currentStep ? styles.progressDone : index === currentStep ? styles.progressOn : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.trust}>
            <span className={styles.protocol}>
              <Icon name="verified_user" size={16} />
              HIPAA &amp; Allergen Protocol L3
            </span>
            <span className={styles.encrypted}>
              <Icon name="lock" size={16} className={styles.lock} />
              TLS 1.3 End-to-End Encrypted
            </span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy &amp; Security</a>
            <a href="#">Clinical Guidelines</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
