import { Minus, Plus, X, Trash2, ShoppingBag } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onChange, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (!open) return null
  return <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <aside className="cart-drawer" aria-label="Shopping bag">
      <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag <em>({items.reduce((n, item) => n + item.quantity, 0)})</em></h2></div><button className="icon-button" onClick={onClose} aria-label="Close bag"><X/></button></div>
      {items.length === 0 ? <div className="empty-cart"><span className="empty-icon"><ShoppingBag size={24}/></span><h3>Your bag is taking a breather.</h3><p>Find something lovely for your routine.</p><button className="button button-dark" onClick={onClose}>Continue exploring</button></div> :
      <>
        <div className="cart-items">{items.map(item => <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} style={{objectPosition:item.position}}/>
          <div className="cart-item-info"><span>{item.brand}</span><h3>{item.name}</h3><strong>${(item.price * item.quantity).toFixed(2)}</strong>
            <div className="quantity-control"><button onClick={() => onChange(item.id, Math.max(1,item.quantity-1))} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => onChange(item.id,item.quantity+1)} aria-label="Increase quantity"><Plus size={13}/></button></div>
          </div>
          <button className="remove-item" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={16}/></button>
        </div>)}</div>
        <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and any applicable taxes are calculated at checkout.</p><button className="button button-dark checkout-button" onClick={() => window.alert('This is a demonstration storefront. Checkout and payment are not connected.')}>Continue to checkout <span>↗</span></button><small>Demo only · No payment will be collected</small></div>
      </>}
    </aside>
  </div>
}