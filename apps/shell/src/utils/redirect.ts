import { AuthError } from '@smartbite/auth'

export type RedirectSearch = {
  redirect?: string
}

export const validateRedirectSearch = (search: Record<string, unknown>): RedirectSearch => ({
  redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
})

// Only allow in-app paths, so ?redirect= can't send users to another site
export const safeRedirect = (path: string | undefined, fallback: string) =>
  path?.startsWith('/') && !path.startsWith('//') ? path : fallback

export const authErrorMessage = (err: unknown) =>
  err instanceof AuthError ? err.message : 'Something went wrong. Please try again.'
