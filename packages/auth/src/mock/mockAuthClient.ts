import type { AuthUser } from '@smartbite/types'
import { AuthError, type AuthClient, type LoginInput, type RegisterInput } from '../types'
import { SEED_USERS } from './seedUsers'

/*
 * MOCK ONLY — stands in for the real backend + database until they exist.
 * Users live in this browser's localStorage, so this is NOT secure and data is per-browser.
 * Replace with an API-backed AuthClient in ../index.ts.
 */

const USERS_KEY = 'smartbite.mock.users'
const SESSION_KEY = 'smartbite.mock.session'
const MIN_PASSWORD_LENGTH = 8

type StoredUser = AuthUser & { passwordHash: string }

// Simulates network latency so loading states are visible
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

async function hashPassword(password: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

// "Remember this device" keeps the session in localStorage; otherwise it ends when the browser closes
const readSession = () => localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)

function writeSession(userId: string, remember: boolean) {
  clearSession()
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, userId)
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

const toAuthUser = ({ id, name, email, role }: StoredUser): AuthUser => ({ id, name, email, role })

export class MockAuthClient implements AuthClient {
  private async loadUsers(): Promise<StoredUser[]> {
    const raw = localStorage.getItem(USERS_KEY)
    const users = raw ? (JSON.parse(raw) as StoredUser[]) : []

    // Add any demo account that isn't stored yet (e.g. one added to SEED_USERS later)
    const missing = SEED_USERS.filter((seed) => !users.some((u) => u.email === normalizeEmail(seed.email)))
    if (missing.length === 0) return users

    const seeded = await Promise.all(
      missing.map(async ({ password, ...user }) => ({
        ...user,
        id: crypto.randomUUID(),
        email: normalizeEmail(user.email),
        passwordHash: await hashPassword(password),
      })),
    )
    const all = [...users, ...seeded]
    this.saveUsers(all)
    return all
  }

  private saveUsers(users: StoredUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  async getCurrentUser() {
    const userId = readSession()
    if (!userId) return null
    const user = (await this.loadUsers()).find((u) => u.id === userId)
    return user ? toAuthUser(user) : null
  }

  async login({ email, password, remember = false }: LoginInput) {
    await delay()
    const users = await this.loadUsers()
    const user = users.find((u) => u.email === normalizeEmail(email))
    if (!user || user.passwordHash !== (await hashPassword(password))) {
      throw new AuthError('Invalid email or password.')
    }
    writeSession(user.id, remember)
    return toAuthUser(user)
  }

  async register({ name, email, password, role }: RegisterInput) {
    await delay()
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new AuthError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
    }
    const users = await this.loadUsers()
    if (users.some((u) => u.email === normalizeEmail(email))) {
      throw new AuthError('An account with this email already exists.')
    }
    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizeEmail(email),
      role,
      passwordHash: await hashPassword(password),
    }
    this.saveUsers([...users, user])
    writeSession(user.id, true)
    return toAuthUser(user)
  }

  async logout() {
    await delay(150)
    clearSession()
  }
}
