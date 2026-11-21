import { Plus } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className="product-image-wrap">
      <img src={product.image} alt={`${product.brand} ${product.name} product packaging`} style={{ objectPosition: product.position }} loading="lazy"/>
      <span className="product-tag">{product.tag}</span>
      <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`}><Plus size={19}/><span>Add to bag</span></button>
    </div>
    <div className="product-meta"><span>{product.brand}</span><span>{product.size}</span></div>
    <div className="product-title-row"><h3>{product.name}</h3><strong>${product.price.toFixed(2)}</strong></div>
    <p>{product.description}</p>
  </article>
}