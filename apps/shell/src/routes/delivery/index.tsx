import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../remotes/remotePage'

export const Route = createFileRoute('/delivery/')({
  component: remotePage(() => import('delivery/Deliveries')),
})
