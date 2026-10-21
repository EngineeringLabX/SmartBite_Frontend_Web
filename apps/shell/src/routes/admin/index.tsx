import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../remotes/remotePage'

export const Route = createFileRoute('/admin/')({
  component: remotePage(() => import('admin/Overview')),
})
