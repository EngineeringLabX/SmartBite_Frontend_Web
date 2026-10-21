import { createFileRoute } from '@tanstack/react-router'
import { dishesQueryOptions } from '../../../api/dishes'
import { DishCard } from '@smartbite/ui'
import { useDishes } from '../../../hooks'

export const Route = createFileRoute('/_app/menu/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(dishesQueryOptions),
  pendingComponent: () => <p>Loading dishes…</p>,
  component: Menu,
})

function Menu() {
  const { data: dishes } = useDishes()

  return (
    <section>
      <h1>Menu</h1>
      <ul className="grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </ul>
    </section>
  )
}
