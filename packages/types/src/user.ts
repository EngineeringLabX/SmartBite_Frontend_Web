export type UserRole = 'Consumer' | 'Restaurant' | 'Home-Chef' | 'Delivery Partner' | 'Platform Admin'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: UserRole
}
