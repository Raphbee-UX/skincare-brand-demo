import { useEffect, useState } from 'react'
import { Minus, Plus, X, Trash2, ShoppingBag, ArrowUpRight } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onChange, onRemove }) {
  const [checkoutPreview, setCheckoutPreview] = useState(false)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((n, item) => n + item.quantity, 0)

  useEffect(() => {
    if (!open) {
      setCheckoutPreview(false)
      return
    }
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null
  return <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2 id="cart-title">Your bag <em>({count})</em></h2></div><button className="icon-button" onClick={onClose} aria-label="Close shopping bag"><X/></button></div>
      {items.length === 0 ? <div className="empty-cart"><span className="empty-icon"><ShoppingBag size={24}/></span><h3>Your bag is taking a breather.</h3><p>Find something lovely for your routine.</p><button className="button button-dark" onClick={onClose}>Continue exploring</button></div> :
      <>
        <div className="cart-items">{items.map(item => <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} style={{objectPosition:item.position}}/>
          <div className="cart-item-info"><span>{item.brand}</span><h3>{item.name}</h3><strong>${(item.price * item.quantity).toFixed(2)}</strong>
            <div className="quantity-control"><button onClick={() => onChange(item.id, Math.max(1,item.quantity-1))} aria-label={`Decrease ${item.name} quantity`}><Minus size={13}/></button><span aria-live="polite">{item.quantity}</span><button onClick={() => onChange(item.id,item.quantity+1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13}/></button></div>
          </div>
          <button className="remove-item" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name} from bag`}><Trash2 size={16}/></button>
        </div>)}</div>
        <div className="cart-summary"><div><span>Subtotal <small>(illustrative)</small></span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes are not calculated in this prototype.</p><button className="button button-dark checkout-button" onClick={() => setCheckoutPreview(true)}>Preview checkout <ArrowUpRight size={16}/></button>
          {checkoutPreview && <div className="checkout-notice" role="status"><strong>You’re at the checkout preview.</strong><span>This concept store is not connected to a payment provider. No order or payment has been submitted.</span></div>}
          <small>Demo only · No payment will be collected</small></div>
      </>}
    </aside>
  </div>
}
