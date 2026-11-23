import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireRole } from '../../utils/guards'

// Kitchen Display System (kitchen micro frontend). The page brings its own light header and
// footer (see KitchenDisplay), like the wellness profile, so this layout adds nothing around it.
export const Route = createFileRoute('/kitchen')({
  beforeLoad: ({ context, location }) => requireRole(context.auth, location, 'Restaurant', 'Home-Chef'),
  component: Outlet,
})
