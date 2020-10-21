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
  const increaseQuantity = id =>{
    const newCart = [...cart].map(item => {
      return item.id === id
        ? { ...item , amount: item.amount + 1 }
        : { ...item  }
    })
    setCart(newCart);
  };

  // decrease amount property
  const decreaseQuantity = id =>{
    const newCart = [...cart].map(item => {
      return item.id === id && item.amount > 0
        ? { ...item, amount: item.amount - 1 }
        : { ...item  }
    })
    setCart(newCart);
  };

  const addToCart = product => {
    const {id, image, title, price} = product
    const item = [...cart].find(item => item.id === id)
    if(item){
      increaseQuantity(id)
      return
    }
    else{
      const newItem = {id, image, title, price, amount: 1}
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
