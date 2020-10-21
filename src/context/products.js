// products context
import React from 'react'
import axios from 'axios'

import url from '../utils/URL'
import {filterForFeaturedProducts, flattenProducts} from '../utils/helpers'

export const ProductContext = React.createContext();

//Provider, Consumer, useContext()

const ProductProvider = ({children}) => {
  const [loading, setLoading] = React.useState(true)
  const [products, setProducts] = React.useState([])
  const [featured, setFeatured] = React.useState([])

  React.useEffect(()=>{
    axios
      .get(`${url}/products`)
      .then(response =>{
        const featuredProducts = filterForFeaturedProducts(flattenProducts(response.data))
        const products = flattenProducts(response.data)
        setProducts( ((prev) => products)) 
        setFeatured(featuredProducts)
        setLoading(false)
      });
    return ()=>{

    }
  }, []);

  return(
    <ProductContext.Provider value={{loading, products, featured}}>{children}
    </ProductContext.Provider>
  )
}

export default ProductProvider;
