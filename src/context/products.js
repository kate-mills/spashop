// products context
import React from 'react'
//import axios from 'axios'

//import url from '../utils/URL'
import localProducts from '../utils/localCart.js'
import {filterForFeaturedProducts} from '../utils/helpers'

export const ProductContext = React.createContext();

//Provider, Consumer, useContext()

const ProductProvider = ({children}) => {
  const [loading, setLoading] = React.useState(true)
  const [products, setProducts] = React.useState([])
  const [featured, setFeatured] = React.useState([])

  React.useEffect(()=>{
    const featuredProducts = filterForFeaturedProducts(localProducts)
    setProducts((prev)=>localProducts)
    setFeatured((prev)=>featuredProducts)
    setLoading(false)
  }, []);

  return(
    <ProductContext.Provider value={{loading, products, featured}}>{children}
    </ProductContext.Provider>
  )
}

export default ProductProvider;
