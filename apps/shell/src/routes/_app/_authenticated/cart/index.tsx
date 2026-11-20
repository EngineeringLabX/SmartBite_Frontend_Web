import { useAuth } from '@smartbite/auth'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../profile/-components/Icon'
import { INITIAL_ALLERGENS } from '../profile/-components/profileData'
import { WellnessShell } from '../profile/-components/WellnessShell'
import styles from './cart.module.css'
import { FEES, INITIAL_CART, ORDER_REFERENCE, SUGGESTED_ADD_ON, type CartItem } from './-components/cartData'
import { TrayItemCard } from './-components/TrayItemCard'
import {
  AddOnSuggestion,
  AllergenRadar,
  BioBudget,
  CheckoutStepper,
  DeliveryCard,
  OrderSummary,
  type Bill,
  type TrayTotals,
} from './-components/TrayPanels'

export const Route = createFileRoute('/_app/_authenticated/cart/')({
  component: Cart,
})

type Toast =
  | { kind: 'removed'; item: CartItem; index: number }
  | { kind: 'added'; item: CartItem }
  | { kind: 'checkout' }

function Cart() {
  const { user } = useAuth()
  const name = user?.name ?? ''
  // There is no cart API yet, so the tray lives in page state
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const totals = useMemo<TrayTotals>(
    () =>
      items.reduce(
        (sum, item) => ({
          count: sum.count + item.quantity,
          kcal: sum.kcal + item.kcal * item.quantity,
          protein: sum.protein + item.protein * item.quantity,
          carbs: sum.carbs + item.carbs * item.quantity,
          fat: sum.fat + item.fat * item.quantity,
        }),
        { count: 0, kcal: 0, protein: 0, carbs: 0, fat: 0 },
      ),
    [items],
  )

  const bill = useMemo<Bill>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const wellMatched = items.every((item) => item.match >= FEES.wellnessMinMatch)
    const offset = wellMatched ? Math.round(subtotal * FEES.wellnessOffset) : 0
    return {
      subtotal,
      packaging: FEES.packaging,
      courier: FEES.courier,
      offset,
      total: subtotal + FEES.packaging + FEES.courier - offset,
    }
  }, [items])

  const setQuantity = (id: string, quantity: number) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)))

  const toggleSaved = (id: string) =>
    setSaved((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const remove = (index: number) => {
    setToast({ kind: 'removed', item: items[index], index })
    setItems((current) => current.filter((_, i) => i !== index))
  }

  const undoRemove = (item: CartItem, index: number) => {
    setItems((current) => [...current.slice(0, index), item, ...current.slice(index)])
    setToast(null)
  }

  const addSuggestion = () => {
    setItems((current) => [...current, SUGGESTED_ADD_ON])
    setToast({ kind: 'added', item: SUGGESTED_ADD_ON })
  }

  const mealCount = items.length
  const hasSuggestion = !items.some((item) => item.id === SUGGESTED_ADD_ON.id)

  return (
    <WellnessShell>
      <CheckoutStepper reference={ORDER_REFERENCE} mealCount={mealCount} />

      <div className={styles.pageHead}>
        <div>
          <Link to="/menu" className={styles.back}>
            <Icon name="arrow_back" size={16} /> Back to Dinner Catalog
          </Link>
          <h1 className={styles.title}>Your Clinical Dinner Tray</h1>
          <p className={styles.subtitle}>
            Calibrated for <strong>{name}</strong> • {mealCount} Chef-Crafted{' '}
            {mealCount === 1 ? 'Prescription' : 'Prescriptions'}
          </p>
        </div>
        <div className={styles.headChips}>
          <span className={styles.safeChip}>
            <Icon name="verified_user" size={16} filled />
            HACCP Allergen Shield: 100% Verified Safe
          </span>
          <span className={styles.tintChipLg}>
            <Icon name="bolt" size={16} />
            Dynamic Metabolic Match
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <section className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Icon name="shopping_bag" size={32} />
          </span>
          <h2>Your tray is empty</h2>
          <p className={styles.muted}>
            Browse the catalog for meals already screened against your wellness profile.
          </p>
          <Link to="/menu" className={styles.emptyButton}>
            <Icon name="restaurant_menu" size={18} />
            Browse Dinner Catalog
          </Link>
        </section>
      ) : (
        <div className={styles.columns}>
          <div className={styles.column}>
            {items.map((item, index) => (
              <TrayItemCard
                key={item.id}
                item={item}
                saved={saved.has(item.id)}
                onQuantity={(quantity) => setQuantity(item.id, quantity)}
                onToggleSaved={() => toggleSaved(item.id)}
                onRemove={() => remove(index)}
              />
            ))}
            <AllergenRadar items={items} allergens={INITIAL_ALLERGENS} name={name} />
            {hasSuggestion && <AddOnSuggestion item={SUGGESTED_ADD_ON} onAdd={addSuggestion} />}
          </div>

          <aside className={`${styles.column} ${styles.sticky}`}>
            <BioBudget totals={totals} />
            <DeliveryCard />
            <OrderSummary
              bill={bill}
              count={totals.count}
              onCheckout={() => setToast({ kind: 'checkout' })}
            />
          </aside>
        </div>
      )}

      {toast && (
        <div className={styles.toast} role="status">
          <Icon
            name={toast.kind === 'checkout' ? 'lock_clock' : 'check_circle'}
            size={22}
            className={styles.toastIcon}
          />
          <div>
            {toast.kind === 'removed' && (
              <>
                <strong>Removed from tray</strong>
                <span>{toast.item.name}</span>
              </>
            )}
            {toast.kind === 'added' && (
              <>
                <strong>Added to tray</strong>
                <span>{toast.item.name}</span>
              </>
            )}
            {toast.kind === 'checkout' && (
              <>
                <strong>Safe Payment is coming soon</strong>
                <span>Your tray is saved and allergen-verified.</span>
              </>
            )}
          </div>
          {toast.kind === 'removed' && (
            <button
              type="button"
              className={styles.undo}
              onClick={() => undoRemove(toast.item, toast.index)}
            >
              Undo
            </button>
          )}
        </div>
      )}
    </WellnessShell>
  )
}
