import React from "react";
import Product from './Product'

const  ProductList = (props) => {
  return(
    <section className="section">
      <h2 className="cursive section-title">{props.title}</h2>
      <div className="products-center">
        {
          props.products.map((product)=>{
            return <Product key={product.id} {...product}/>
          })
        }
      </div>
    </section>
  )
}

export default ProductList;
