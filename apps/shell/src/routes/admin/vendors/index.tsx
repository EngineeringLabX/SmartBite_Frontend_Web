import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../../remotes/remotePage'

export const Route = createFileRoute('/admin/vendors/')({
  component: remotePage(() => import('admin/VendorApprovals')),
})
