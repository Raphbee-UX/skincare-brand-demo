import { useState } from 'react'
import { Menu, Search, ShoppingBag, X, ArrowUpRight } from 'lucide-react'

export default function Header({ count, onCart, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)
  const links = [['Shop', '#shop'], ['Our edit', '#edit'], ['Our story', '#story'], ['Contact', '#contact']]

  return <>
    <div className="announcement">A little care goes a long way <span>—</span> welcome to Boss Beauty</div>
    <header className="site-header">
      <button className="icon-button mobile-menu-trigger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21}/></button>
      <a className="wordmark" href="#top" aria-label="Boss Beauty home">boss<span>beauty</span><i>.</i></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button search-trigger" aria-label="Search products" onClick={onSearch}><Search size={19}/></button>
        <button className="bag-button" onClick={onCart} aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18}/><span>Bag</span><b>{count}</b></button>
      </div>
    </header>
    {menuOpen && <div className="mobile-menu">
      <div className="mobile-menu-top"><a className="wordmark" href="#top" onClick={close}>boss<span>beauty</span><i>.</i></a><button className="icon-button" onClick={close} aria-label="Close menu"><X/></button></div>
      <nav>{links.map(([label, href], i) => <a key={label} href={href} onClick={close}><span>0{i+1}</span>{label}<ArrowUpRight size={18}/></a>)}</nav>
      <p>Thoughtful finds for your everyday routine.</p>
    </div>}
  </>
}