import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { SectionShell } from './SectionShell'
import { products } from '@/data/products'

export const ProductsSection = forwardRef<HTMLElement>(function ProductsSection(_props, ref) {
  return (
    <SectionShell id="products" ref={ref} moduleId="SYS/03" label="PRODUCTS" align="right" wide>
      <p className="kicker">Independent SaaS — designed, built, and deployed solo</p>
      <h2 className="display-heading">Three systems, shipped end to end</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p className="product-tagline">{product.tagline}</p>
            <p className="body-copy">{product.description}</p>
            <div className="product-card-links">
              <Link to={product.route}>Case study →</Link>
              {product.url && (
                <a href={product.url} target="_blank" rel="noreferrer">
                  Visit ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
})
