import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../../remotes/remotePage'

export const Route = createFileRoute('/delivery/earnings/')({
  component: remotePage(() => import('delivery/Earnings')),
})
