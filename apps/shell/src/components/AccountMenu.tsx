import { useAuth } from '@smartbite/auth'
import { useRouter } from '@tanstack/react-router'

/** Signed-in user + sign out, for use on the dark backdrop (headers, sidebars, top bars) */
export function AccountMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const signOut = async () => {
    await logout()
    // Re-run route guards so a protected page the user is on redirects away
    await router.invalidate()
  }

  return (
    <div className="account-menu">
      <span>
        {user.name}
        <small>{user.role}</small>
      </span>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}
