import { DEMO_ACCOUNTS, useAuth } from '@smartbite/auth'
import { useRouter } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'
import { HOME_BY_ROLE } from '../utils/guards'
import styles from './DevUserSwitcher.module.css'

/**
 * DEV ONLY — one-click sign-in as any demo account, to test each portal without typing credentials.
 * It goes through the normal login, so route guards and roles behave exactly as for a real user.
 * Rendered only when import.meta.env.DEV (see __root.tsx), so it never ships to production.
 */
export function DevUserSwitcher() {
  const { user, login, logout } = useAuth()
  const router = useRouter()

  const switchUser = async (e: ChangeEvent<HTMLSelectElement>) => {
    const account = DEMO_ACCOUNTS.find((a) => a.email === e.target.value)
    if (!account) {
      await logout()
      await router.invalidate()
      return
    }
    const signedIn = await login({ email: account.email, password: account.password, remember: true })
    await router.invalidate()
    await router.navigate({ to: HOME_BY_ROLE[signedIn.role] })
  }

  const isDemo = DEMO_ACCOUNTS.some((a) => a.email === user?.email)

  return (
    <label className={styles.switcher}>
      DEV user
      <select value={user?.email ?? ''} onChange={switchUser}>
        <option value="">Signed out</option>
        {user && !isDemo && <option value={user.email}>{user.name} (registered)</option>}
        {DEMO_ACCOUNTS.map((a) => (
          <option key={a.email} value={a.email}>
            {a.role} — {a.name}
          </option>
        ))}
      </select>
    </label>
  )
}
