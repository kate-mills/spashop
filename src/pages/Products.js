import React from "react";
import {ProductContext} from '../context/products'

import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'

const Products = () => {
  const {loading, products} = React.useContext(ProductContext)

  if (loading){
    return <Loading/>
  }

  return <ProductList products={products} title={`All Products`}/>
}

export default Products
