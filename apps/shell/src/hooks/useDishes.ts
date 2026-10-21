import { useSuspenseQuery } from '@tanstack/react-query'
import { dishesQueryOptions } from '../api/dishes'

export const useDishes = () => useSuspenseQuery(dishesQueryOptions)
