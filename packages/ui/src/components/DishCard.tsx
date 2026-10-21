import type { Dish } from '@smartbite/types'
import { formatCalories, formatPrice } from '../utils/format'
import styles from './DishCard.module.css'

type DishCardProps = {
  dish: Dish
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <li className={styles.card}>
      <h3 className={styles.name}>{dish.name}</h3>
      <p className={styles.vendor}>{dish.vendor}</p>
      <p>
        {formatCalories(dish.calories)} · {formatPrice(dish.price)}
      </p>
      <div className={styles.chips}>
        {dish.tags.map((t) => (
          <span key={t} className={styles.chip}>
            {t}
          </span>
        ))}
        {dish.allergens.map((a) => (
          <span key={a} className={`${styles.chip} ${styles.warn}`}>
            contains {a}
          </span>
        ))}
      </div>
    </li>
  )
}
