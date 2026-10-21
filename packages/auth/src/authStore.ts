import type { AuthUser, UserRole } from '@smartbite/types'
import type { AuthClient, LoginInput, RegisterInput } from './types'

/**
 * Holds the signed-in user for the whole app. The router reads it in beforeLoad,
 * React reads it through useAuth(). Shared as a singleton, so remotes see the same user.
 */
export function createAuthStore(client: AuthClient) {
  let user: AuthUser | null = null
  const listeners = new Set<() => void>()

  const setUser = (next: AuthUser | null) => {
    user = next
    listeners.forEach((listener) => listener())
  }

  return {
    getUser: () => user,

    hasRole: (...roles: UserRole[]) => user !== null && roles.includes(user.role),

    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },

    /** Call once before the app renders */
    async init() {
      setUser(await client.getCurrentUser())
    },

    async login(input: LoginInput) {
      const next = await client.login(input)
      setUser(next)
      return next
    },

    async register(input: RegisterInput) {
      const next = await client.register(input)
      setUser(next)
      return next
    },

    async logout() {
      await client.logout()
      setUser(null)
    },
  }
}

export type AuthStore = ReturnType<typeof createAuthStore>
