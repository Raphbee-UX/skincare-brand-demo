import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Search, X, Instagram, MessageCircle, Sparkles } from 'lucide-react'
import Header from './components/Header.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { products, categories } from './data/products.js'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [toast, setToast] = useState('')

  const count = cart.reduce((n, item) => n + item.quantity, 0)
  const visibleProducts = useMemo(() => products.filter(p =>
    (filter === 'All' || p.category === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  ), [filter, search])

  const addToCart = (product) => {
    setCart(current => current.some(item => item.id === product.id)
      ? current.map(item => item.id === product.id ? {...item, quantity:item.quantity+1} : item)
      : [...current, {...product, quantity:1}])
    setToast(`${product.name} added to your bag`)
    window.setTimeout(() => setToast(''), 2400)
  }
  const changeQuantity = (id, quantity) => setCart(current => current.map(item => item.id === id ? {...item, quantity} : item))
  const removeItem = (id) => setCart(current => current.filter(item => item.id !== id))

  const submitNewsletter = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return <div id="top">
    <Header count={count} onCart={() => setCartOpen(true)} onSearch={() => {setSearchOpen(true);document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}}/>
    {searchOpen && <div className="search-panel" role="search" aria-label="Search the product edit"><Search size={18}/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the edit..." aria-label="Search products"/><button onClick={()=>{setSearch('');setSearchOpen(false)}} aria-label="Close search"><X size={18}/></button></div>}

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> THE BOSS BEAUTY EDIT</div>
          <h1>Make room for<br/><em>your kind</em> of glow.</h1>
          <p>A thoughtful little corner for the skincare and body-care finds you’ll love reaching for, every day.</p>
          <div className="hero-actions"><a className="button button-dark" href="#shop">Shop the edit <ArrowUpRight size={16}/></a><a className="text-link" href="#story">Get to know us <ArrowRight size={16}/></a></div>
          <div className="hero-note"><Sparkles size={15}/><span>Good finds. Feel-good routines. All in one place.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src="https://raw.githubusercontent.com/Raphbee-UX/skincare-brand-demo/main/Screenshot_20261120-135317.png" alt="Green Tea Blemish Care cleanser from the Boss Beauty edit"/></div>
          <div className="hero-stamp"><span>CARE</span><b>BEAUTY</b><span>EVERY DAY</span></div>
          <div className="hero-caption">A little ritual, a lot of you.</div>
        </div>
        <a className="scroll-cue" href="#shop"><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></a>
      </section>

      <section className="trust-strip"><span>THE EVERYDAY EDIT</span><i>✳</i><span>PERSONAL PICKS</span><i>✳</i><span>CARE, YOUR WAY</span><i>✳</i><span>THE BOSS BEAUTY STANDARD</span></section>

      <section className="shop-section section-pad" id="shop">
        <div className="section-heading"><div><span className="eyebrow">A GOOD PLACE TO START</span><h2>Find your <em>favourites.</em></h2></div><p>Considered picks for the little moments that make up your routine.</p></div>
        <div className="shop-toolbar"><div className="filter-tabs" role="group" aria-label="Filter products">{categories.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div><span className="results-count">{visibleProducts.length} FINDS</span></div>
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map(p=><ProductCard key={p.id} product={p} onAdd={addToCart}/>)}</div> : <div className="no-results">No finds matched that search. Try another name.</div>}
        <div className="catalog-note">Prototype catalogue · Product names are based on reference packaging. All prices are illustrative placeholders and must be confirmed by the brand owner.</div>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://raw.githubusercontent.com/Raphbee-UX/skincare-brand-demo/main/Screenshot_20261120-135347.png" alt="Boss Beauty creator presenting a product from the collection"/></div>
        <div className="story-copy"><span className="eyebrow">A NOTE FROM BOSS BEAUTY</span><h2>Beauty is personal.<br/><em>Your routine should be, too.</em></h2><p>We believe finding the right products should feel simple, welcoming and a little exciting. Boss Beauty brings together a considered mix of skincare and body-care favourites, with a real person behind every recommendation.</p><p>Take your time, explore the edit and find the things that feel right for you.</p><a href="#contact" className="text-link">A little more about us <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="ingredient-section section-pad" id="edit">
        <div className="ingredient-intro"><span className="eyebrow">THE DETAILS MATTER</span><h2>Know what’s<br/><em>in your routine.</em></h2><p>From a fresh-feeling cleanse to the comfort of body care, every product has its own place. Explore the packaging and product details before you make it yours.</p><a href="#shop" className="text-link">Explore the product edit <ArrowRight size={16}/></a></div>
        <div className="ingredient-cards">
          <article className="ingredient-card green"><span>01 / CLEANSING</span><div className="ingredient-art"><img src="https://raw.githubusercontent.com/Raphbee-UX/skincare-brand-demo/main/Screenshot_20261120-135317.png" alt="Green Tea Blemish Care product"/></div><h3>Green tea edit</h3><p>A recognisable green-packaged cleanser in the current product selection.</p></article>
          <article className="ingredient-card blush"><span>02 / DAILY CARE</span><div className="ingredient-art"><img src="https://raw.githubusercontent.com/Raphbee-UX/skincare-brand-demo/main/Screenshot_20261120-135255.png" alt="Face Facts Ceramide cleanser"/></div><h3>Ceramide care</h3><p>A cleanser featuring ceramides, with the exact product details to be confirmed on-pack.</p></article>
        </div>
      </section>

      <section className="editorial-banner">
        <img src="https://raw.githubusercontent.com/Raphbee-UX/skincare-brand-demo/main/Screenshot_20261120-135343.png" alt="Boss Beauty sharing a product from her beauty collection"/>
        <div className="editorial-overlay"><span className="eyebrow">THE BEAUTY OF A GOOD FIND</span><h2>Little discoveries.<br/><em>Everyday favourites.</em></h2><a href="#shop" className="button button-light">Explore the edit <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="community-section section-pad">
        <div className="community-heading"><span className="eyebrow">KIND WORDS, REAL COMMUNITY</span><h2>Beauty is better<br/><em>when we share.</em></h2><p>These are demonstration quotes, not verified customer reviews. Replace them with approved feedback before launch.</p></div>
        <div className="quote-grid"><blockquote><span>“</span><p>Found a product I’d been curious about and got a helpful answer before choosing.</p><footer>— DEMO REVIEW <i>·</i> COMMUNITY SHOPPER</footer></blockquote><blockquote><span>“</span><p>I love seeing the products up close. It makes browsing feel much more personal.</p><footer>— DEMO REVIEW <i>·</i> COMMUNITY SHOPPER</footer></blockquote></div>
      </section>

      <section className="newsletter-section" id="contact">
        <div className="newsletter-mark">bb.</div><span className="eyebrow">A NOTE FROM US TO YOU</span><h2>Good things, straight<br/><em>to your inbox.</em></h2><p>Be first to hear about new finds, restocks and little updates from Boss Beauty.</p>
        {subscribed ? <div className="success-message"><Check size={18}/> You’re on the demo list. Thanks for stopping by.</div> : <form className="newsletter-form" onSubmit={submitNewsletter}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" aria-label="Your email address"/><button type="submit">Join the list <ArrowUpRight size={16}/></button></form>}
        <small>Prototype form only · No email address is stored or sent.</small>
      </section>
    </main>

    <footer className="site-footer">
      <div className="footer-main"><div className="footer-brand"><a className="wordmark" href="#top">boss<span>beauty</span><i>.</i></a><p>Good finds for your everyday care.</p><div className="social-links"><a href="#contact" aria-label="Instagram placeholder"><Instagram size={17}/></a><a href="#contact" aria-label="Community contact placeholder"><MessageCircle size={17}/></a></div></div>
        <div className="footer-column"><span>EXPLORE</span><a href="#shop">Shop all</a><a href="#edit">The edit</a><a href="#story">Our story</a></div>
        <div className="footer-column"><span>HERE TO HELP</span><a href="mailto:hello@bossbeauty.example">Contact us</a><a href="#contact">FAQs</a><a href="#contact">Shipping & returns</a></div>
        <div className="footer-note"><span>YOUR ROUTINE, YOUR RULES.</span><p>Thoughtful picks, friendly service and a little more joy in your everyday care.</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 BOSS BEAUTY. ALL RIGHTS RESERVED.</span><span>DESIGNED WITH CARE <i>✳</i></span><span>DEMO STOREFRONT · NOT A LIVE CHECKOUT</span></div>
    </footer>

    {toast && <div className="toast" role="status" aria-live="polite"><Check size={16}/>{toast}<button onClick={()=>setCartOpen(true)}>View bag</button></div>}
    <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onChange={changeQuantity} onRemove={removeItem}/>
  </div>
}