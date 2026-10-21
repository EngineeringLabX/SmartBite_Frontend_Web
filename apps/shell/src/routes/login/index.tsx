import { useAuth } from '@smartbite/auth'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { authErrorMessage, safeRedirect, validateRedirectSearch } from '../../utils/redirect'
import { HOME_BY_ROLE } from '../../utils/guards'
import { BrandPanel } from './-components/BrandPanel'
import { GitHubIcon, GoogleIcon, LogoMark } from './-components/icons'
import styles from './login.module.css'

export const Route = createFileRoute('/login/')({
  validateSearch: validateRedirectSearch,
  beforeLoad: ({ context, search }) => {
    const user = context.auth.getUser()
    if (user) {
      throw redirect({ href: safeRedirect(search.redirect, HOME_BY_ROLE[user.role]) })
    }
  },
  component: Login,
})

function Login() {
  const { login } = useAuth()
  const router = useRouter()
  const { redirect: redirectTo } = Route.useSearch()
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError(null)
    setNotice(null)
    setPending(true)
    try {
      const user = await login({
        email: String(form.get('email')),
        password: String(form.get('password')),
        remember: form.get('remember') === 'on',
      })
      await router.invalidate()
      // Back to where they were going, otherwise their own area (vendor portal, rider app, ...)
      await router.navigate({ href: safeRedirect(redirectTo, HOME_BY_ROLE[user.role]) })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setPending(false)
    }
  }

  // Not supported by the auth backend yet
  const comingSoon = (feature: string) => {
    setError(null)
    setNotice(`${feature} isn't available yet.`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <BrandPanel />

        <section className={styles.formPanel}>
          <div className={styles.formInner}>
            <span className={styles.logo}>
              <LogoMark />
            </span>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>Your personalised food companion</p>

            <div className={styles.social}>
              <button type="button" className={styles.socialButton} onClick={() => comingSoon('Google sign-in')}>
                <GoogleIcon /> Google
              </button>
              <button type="button" className={styles.socialButton} onClick={() => comingSoon('GitHub sign-in')}>
                <GitHubIcon /> GitHub
              </button>
            </div>

            <div className={styles.divider}>or sign in with</div>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.field}>
                Email
                <input name="email" type="email" autoComplete="username" required />
              </label>
              <label className={styles.field}>
                Password
                <input name="password" type="password" autoComplete="current-password" required />
              </label>

              <div className={styles.row}>
                <label className={styles.remember}>
                  <input type="checkbox" name="remember" />
                  Remember this device
                </label>
                <button type="button" className={styles.linkButton} onClick={() => comingSoon('Password reset')}>
                  Forgot Password?
                </button>
              </div>

              {error && (
                <p className={styles.message} role="alert">
                  {error}
                </p>
              )}
              {notice && <p className={`${styles.message} ${styles.notice}`}>{notice}</p>}

              <button type="submit" className={styles.submit} disabled={pending}>
                {pending ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className={styles.footer}>
              New to SmartBite?{' '}
              <Link to="/register" search={{ redirect: redirectTo }}>
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
