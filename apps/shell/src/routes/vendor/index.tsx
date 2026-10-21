import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../remotes/remotePage'

export const Route = createFileRoute('/vendor/')({
  component: remotePage(() => import('vendor/Dashboard')),
})
