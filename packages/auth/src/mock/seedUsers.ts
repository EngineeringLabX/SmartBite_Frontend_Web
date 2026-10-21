import type { RegisterInput } from '../types'

// Demo accounts created the first time the mock "database" is used.
// Test-only credentials for local development — never use real passwords here.
export const SEED_USERS: RegisterInput[] = [
  { name: 'Demo Consumer', email: 'consumer@smartbite.test', password: 'SmartBite#2026', role: 'Consumer' },
  { name: 'Demo Restaurant', email: 'restaurant@smartbite.test', password: 'SmartBite#2026', role: 'Restaurant' },
  { name: 'Demo Home-Chef', email: 'chef@smartbite.test', password: 'SmartBite#2026', role: 'Home-Chef' },
  { name: 'Demo Rider', email: 'rider@smartbite.test', password: 'SmartBite#2026', role: 'Delivery Partner' },
  { name: 'Demo Admin', email: 'admin@smartbite.test', password: 'SmartBite#2026', role: 'Platform Admin' },
]
