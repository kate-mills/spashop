import React from "react";

import { FiChevronUp, FiChevronDown } from "react-icons/fi";

import {CartContext} from '../../context/cart'

const CartItem = ({id, image, title, price, amount}) => {
  const {removeItem, increaseQuantity, decreaseQuantity} = React.useContext(CartContext);

  return (
    <article className="cart-item">
      <img src={image} alt={title}/>

      <div className="">
        <h4>{title}</h4>
        <h5>$ {price} </h5>
        <button type="button" className="cart-btn remove-btn"
          onClick={()=>removeItem(id)}
        >remove</button>
      </div>

      <div>
        <button type="button" className="cart-btn amount-btn"
          onClick={() => increaseQuantity(id)}>
          <FiChevronUp/>
        </button>

        <p className="item-amount">{amount}</p>

        <button type="button" className="cart-btn amount-btn" onClick={ ()=> decreaseQuantity(id)}>
          <FiChevronDown/>
        </button>
      </div>


    </article>
  )
}

export default CartItem;
