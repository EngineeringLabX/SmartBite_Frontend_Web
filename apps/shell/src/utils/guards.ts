import type { AuthStore } from '@smartbite/auth'
import type { UserRole } from '@smartbite/types'
import { redirect, type ParsedLocation } from '@tanstack/react-router'

// Where each kind of user lands after signing in
export const HOME_BY_ROLE = {
  Consumer: '/profile',
  Restaurant: '/vendor',
  'Home-Chef': '/vendor',
  'Delivery Partner': '/delivery',
  'Platform Admin': '/admin',
} as const satisfies Record<UserRole, string>

/**
 * Use in a route's beforeLoad. Signed-out users go to /login (and come back afterwards);
 * signed-in users without one of `roles` go to their own home page.
 */
export function requireRole(auth: AuthStore, location: ParsedLocation, ...roles: UserRole[]) {
  const user = auth.getUser()
  if (!user) {
    throw redirect({ to: '/login', search: { redirect: location.href } })
  }
  if (roles.length > 0 && !roles.includes(user.role)) {
    throw redirect({ to: HOME_BY_ROLE[user.role] })
  }
}
