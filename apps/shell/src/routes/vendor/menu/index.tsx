import { createFileRoute } from '@tanstack/react-router'
import { remotePage } from '../../../remotes/remotePage'

export const Route = createFileRoute('/vendor/menu/')({
  component: remotePage(() => import('vendor/MenuManager')),
})
