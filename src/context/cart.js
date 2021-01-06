// cart context
import React from 'react'
//import localCart from '../utils/localCart'


const getCartFromLocalStorage = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
}

export const CartContext = React.createContext();

const CartProvider = ({children})=>{
  const [cart, setCart] = React.useState(getCartFromLocalStorage())
  const [total, setTotal] = React.useState(0)
  const [cartItems, setCartItems] = React.useState(0)

  const removeItem = id =>{ 
    setCart([...cart].filter(item  => item.id !== id))
  };

  // increase amount property
  const increaseQuantity = (id) =>{
    const newCart = [...cart].map(item => {
      if(item.id === id && item.amount+1<=item.max){
        return {...item, amount: item.amount+1, maxLimit:item.amount+1>=item.max }
      }
      else{
        return {...item, maxLimit: item.amount===item.max}
      }
    })
    setCart(newCart);
  };

  // decrease amount property
  const decreaseQuantity = id =>{
    const newCart = [...cart].map(item => {
      return item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 , maxLimit: false}
        : { ...item  }
    })
    setCart(newCart);
  };

  const addToCart = product => {
    const {id, image, title, price, max=6} = product
    const item = [...cart].find(item => item.id === id)
    if(item){
      // customer hit maximum quantity limit
      increaseQuantity(id)
      return
    }
    else{
      const newItem = {id, image, title, price, amount: 1, max, maxLimit:false}
      const newCart = [...cart, newItem]
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([])
  };


  React.useEffect(()=>{
    // local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    let newCartItems = cart.reduce((total, cartItem)=>{
      return total += cartItem.amount
    }, 0)
    setCartItems(newCartItems);

    let newTotal = cart.reduce((total, cartItem) =>{
      return(total += cartItem.amount * cartItem.price);
    }, 0)
    newTotal = parseFloat(newTotal.toFixed(2))
    setTotal(newTotal);

    return ()=>{ }
  }, [cart])



  return <CartContext.Provider value={{
    cart, total, cartItems,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    clearCart,
    }}>
    {children}
    </CartContext.Provider>
}

export default CartProvider;
