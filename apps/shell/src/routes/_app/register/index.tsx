import { useAuth } from '@smartbite/auth'
import type { UserRole } from '@smartbite/types'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { USER_ROLES } from '../../../constants'
import { authErrorMessage, safeRedirect, validateRedirectSearch } from '../../../utils/redirect'
import { HOME_BY_ROLE } from '../../../utils/guards'

export const Route = createFileRoute('/_app/register/')({
  validateSearch: validateRedirectSearch,
  beforeLoad: ({ context, search }) => {
    const user = context.auth.getUser()
    if (user) {
      throw redirect({ href: safeRedirect(search.redirect, HOME_BY_ROLE[user.role]) })
    }
  },
  component: Register,
})

function Register() {
  const { register } = useAuth()
  const router = useRouter()
  const { redirect: redirectTo } = Route.useSearch()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setError(null)
    setPending(true)
    try {
      const user = await register({
        name: String(form.get('name')),
        email: String(form.get('email')),
        password: String(form.get('password')),
        role: form.get('role') as UserRole,
      })
      await router.invalidate()
      // Back to where they were going, otherwise their own area (vendor portal, rider app, ...)
      await router.navigate({ href: safeRedirect(redirectTo, HOME_BY_ROLE[user.role]) })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="narrow">
      <h1>Create an account</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>
          I am a
          <select name="role" defaultValue="Consumer">
            {USER_ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Full name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="new-password" minLength={8} required />
        </label>
        <label className="checkbox">
          <input type="checkbox" name="consent" required />I agree to the privacy policy and health-data processing.
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button" disabled={pending}>
          {pending ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="muted">
        Already have an account?{' '}
        <Link to="/login" search={{ redirect: redirectTo }}>
          Log in
        </Link>
      </p>
    </section>
  )
}
