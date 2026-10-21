import { queryOptions } from '@tanstack/react-query'
import type { Dish } from '@smartbite/types'

// Mock data until the catalog API (Epic 3) is available
const DISHES: Dish[] = [
  { id: '1', name: 'Quinoa Buddha Bowl', vendor: 'Green Leaf Kitchen', calories: 520, tags: ['vegan', 'gluten-free'], allergens: ['sesame'], price: 1450 },
  { id: '2', name: 'Grilled Chicken Salad', vendor: 'FitFuel', calories: 410, tags: ['keto', 'halal'], allergens: ['dairy'], price: 1650 },
  { id: '3', name: 'Lentil Dhal & Brown Rice', vendor: "Amma's Home Kitchen", calories: 610, tags: ['vegan', 'halal'], allergens: [], price: 950 },
  { id: '4', name: 'Salmon Poke', vendor: 'Ocean Bowl', calories: 480, tags: ['high-protein'], allergens: ['fish', 'soy'], price: 2200 },
]

export const dishesQueryOptions = queryOptions({
  queryKey: ['dishes'],
  queryFn: async (): Promise<Dish[]> => {
    await new Promise((r) => setTimeout(r, 300))
    return DISHES
  },
})
