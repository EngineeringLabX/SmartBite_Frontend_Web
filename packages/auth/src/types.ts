import type { AuthUser, UserRole } from '@smartbite/types'

export type Credentials = {
  email: string
  password: string
}

export type LoginInput = Credentials & {
  /** Keep the user signed in after the browser closes */
  remember?: boolean
}

export type RegisterInput = Credentials & {
  name: string
  role: UserRole
}

/**
 * What any auth backend must provide. The app only talks to this interface, so the
 * mock can be replaced by a real API client (cookie or JWT based) without touching pages.
 */
export interface AuthClient {
  /** Restores the signed-in user on page load, or null if nobody is signed in */
  getCurrentUser(): Promise<AuthUser | null>
  login(input: LoginInput): Promise<AuthUser>
  register(input: RegisterInput): Promise<AuthUser>
  logout(): Promise<void>
}

/** Expected failures (wrong password, email taken) — safe to show to the user */
export class AuthError extends Error {
  name = 'AuthError'
}
