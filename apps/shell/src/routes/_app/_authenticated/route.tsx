import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireRole } from '../../../utils/guards'

// Layout for every route inside _authenticated/ — sends signed-out users to /login
export const Route = createFileRoute('/_app/_authenticated')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location),
  component: Outlet,
})
