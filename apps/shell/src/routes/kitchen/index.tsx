import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../remotes/remotePage'

export const Route = createFileRoute('/kitchen/')({
  component: remotePage(() => import('kitchen/KitchenDisplay')),
})
