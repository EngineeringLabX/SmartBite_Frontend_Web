import { formatPrice } from '@smartbite/ui'
import { Icon } from '../../profile/-components/Icon'
import styles from '../cart.module.css'
import { MAX_QUANTITY, type CartItem } from './cartData'

type TrayItemCardProps = {
  item: CartItem
  saved: boolean
  onQuantity: (quantity: number) => void
  onToggleSaved: () => void
  onRemove: () => void
}

export function TrayItemCard({ item, saved, onQuantity, onToggleSaved, onRemove }: TrayItemCardProps) {
  return (
    <article className={styles.item}>
      <div className={styles.itemGlow} />
      <div className={styles.itemBody}>
        <div className={styles.itemPhoto}>
          <img src={item.image} alt={item.imageAlt} />
          <span className={styles.stationTag}>{item.stationTag}</span>
        </div>

        <div className={styles.itemInfo}>
          <div className={styles.itemHead}>
            <div>
              <div className={styles.itemMeta}>
                <span className={styles.matchChip}>{item.match}% Biological Match</span>
                <span className={styles.highlight}>• {item.highlight}</span>
              </div>
              <h2 className={styles.itemName}>{item.name}</h2>
            </div>
            <div className={styles.itemPrice}>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <span>{formatPrice(item.price)} / portion</span>
            </div>
          </div>

          <div className={styles.macros}>
            <span className={styles.macroKcal}>{item.kcal * item.quantity} kcal</span>
            <span className={styles.macroProtein}>{item.protein * item.quantity}g Protein</span>
            <span className={styles.macro}>
              {item.carbs * item.quantity}g {item.carbsLabel}
            </span>
            <span className={styles.macro}>
              {item.fat * item.quantity}g {item.fatLabel}
            </span>
          </div>

          {item.modifiers.length > 0 && (
            <ul className={styles.modifiers}>
              {item.modifiers.map((modifier) => (
                <li key={modifier.label}>
                  <Icon name={modifier.icon} size={14} className={styles.primaryText} />
                  <strong>{modifier.label}:</strong> {modifier.value}
                </li>
              ))}
            </ul>
          )}

          <p className={styles.safety}>
            <Icon name={item.safety.icon} size={16} filled />
            {item.safety.text}
          </p>
        </div>
      </div>

      <div className={styles.itemControls}>
        <div className={styles.stepper} role="group" aria-label={`Portions of ${item.name}`}>
          <button
            type="button"
            disabled={item.quantity <= 1}
            title="Minimum batch is 1"
            aria-label="Remove a portion"
            onClick={() => onQuantity(item.quantity - 1)}
          >
            <Icon name="remove" size={16} />
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label="Add a portion"
            onClick={() => onQuantity(item.quantity + 1)}
          >
            <Icon name="add" size={16} />
          </button>
        </div>

        <div className={styles.itemActions}>
          <button type="button" className={styles.linkPrimary} disabled title="Coming soon">
            <Icon name="edit_note" size={15} />
            Edit Modifiers
          </button>
          <span className={styles.dot}>•</span>
          <button
            type="button"
            className={saved ? styles.linkSaved : styles.linkMuted}
            aria-pressed={saved}
            onClick={onToggleSaved}
          >
            <Icon name="favorite" size={15} filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <span className={styles.dot}>•</span>
          <button type="button" className={styles.linkDanger} onClick={onRemove}>
            <Icon name="delete" size={15} />
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}
