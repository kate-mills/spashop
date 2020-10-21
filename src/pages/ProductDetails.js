import React from "react";
import {useParams, useHistory} from 'react-router-dom'
import {ProductContext} from '../context/products'
import {CartContext} from '../context/cart'

// import Product from '../components/Products/Product'
import Loading from '../components/Loading'


const ProductDetails = () =>{

  const params = useParams();
  const history = useHistory();

  const {products} = React.useContext(ProductContext);
  const {addToCart} = React.useContext(CartContext);

  const product = products.find(product => {
    return product.id === parseInt(params.id)
  });

  if(product){
    return (
    <section className="single-product">
      <img src={product.image} alt={product.title} className="single-product-image"/>
      <article className="">
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <button 
          onClick={
            ()=>{
            addToCart(product)
            history.push('/cart')
          }}
        className="btn btn-primary btn-block">add to cart</button>
      </article>
    </section>
    )
  }

  return <Loading/>
}

export default ProductDetails;
