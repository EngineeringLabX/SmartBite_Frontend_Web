import type { Dish } from '@smartbite/types'
import { formatCalories, formatPrice } from '@smartbite/ui'
import { useState } from 'react'
import styles from './MenuManager.module.css'

type MenuItem = Dish & { available: boolean }

// Mock data until the catalog API (Epic 3) is available
const INITIAL_MENU: MenuItem[] = [
  { id: '1', name: 'Quinoa Buddha Bowl', vendor: 'Green Leaf Kitchen', calories: 520, tags: ['vegan', 'gluten-free'], allergens: ['sesame'], price: 1450, available: true },
  { id: '2', name: 'Grilled Chicken Salad', vendor: 'Green Leaf Kitchen', calories: 410, tags: ['keto', 'halal'], allergens: ['dairy'], price: 1650, available: true },
  { id: '5', name: 'Coconut Chia Pudding', vendor: 'Green Leaf Kitchen', calories: 290, tags: ['vegan'], allergens: ['tree nuts'], price: 750, available: false },
  { id: '6', name: 'Jackfruit Curry & Red Rice', vendor: 'Green Leaf Kitchen', calories: 580, tags: ['vegan', 'halal'], allergens: [], price: 1100, available: false },
]

export default function MenuManager() {
  const [menu, setMenu] = useState(INITIAL_MENU)

  // Local only for now — will call the catalog API (F-3.5 real-time availability)
  const toggle = (id: string) =>
    setMenu((items) => items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))

  return (
    <section>
      <h2 className={styles.heading}>Menu</h2>
      <p className={styles.muted}>Mark dishes available or sold out. Allergens are shown to customers and checked against their wellness profile.</p>

      <ul className={styles.list}>
        {menu.map((item) => (
          <li key={item.id} className={styles.item}>
            <div>
              <strong>{item.name}</strong>
              <p className={styles.meta}>
                {formatCalories(item.calories)} · {formatPrice(item.price)} · {item.tags.join(', ')}
              </p>
              <p className={styles.allergens}>
                {item.allergens.length > 0 ? `Allergens: ${item.allergens.join(', ')}` : 'No listed allergens'}
              </p>
            </div>
            <label className={styles.toggle}>
              <input type="checkbox" checked={item.available} onChange={() => toggle(item.id)} />
              {item.available ? 'Available' : 'Sold out'}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
