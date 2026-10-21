import type { UserRole } from '@smartbite/types'

// Roles a person can pick when signing up (Platform Admin is assigned, never self-registered)
export const USER_ROLES: readonly UserRole[] = ['Consumer', 'Restaurant', 'Home-Chef', 'Delivery Partner']
