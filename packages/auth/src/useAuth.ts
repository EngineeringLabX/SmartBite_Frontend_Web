import { useSyncExternalStore } from 'react'
import { auth } from './auth'

/** The signed-in user (re-renders on login/logout) plus the auth actions */
export function useAuth() {
  const user = useSyncExternalStore(auth.subscribe, auth.getUser)

  return {
    user,
    isAuthenticated: user !== null,
    hasRole: auth.hasRole,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
  }
}
