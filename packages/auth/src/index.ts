export { auth } from './auth'
// Mock demo accounts, for the shell's dev-only user switcher
export { SEED_USERS as DEMO_ACCOUNTS } from './mock/seedUsers'
export type { AuthStore } from './authStore'
export { AuthError, type AuthClient, type Credentials, type LoginInput, type RegisterInput } from './types'
export { useAuth } from './useAuth'
