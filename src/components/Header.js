import React from "react";
import {Link} from 'react-router-dom'
import logo from "../assets/spa-shop-sm.png"
import CartLink from './Cart/CartLink'
import LoginLink from './LoginLink'
import {UserContext} from '../context/user'

const Header = () =>{
  const {user} = React.useContext(UserContext);
  return <header className="header">
    <img src={logo} alt="spa logo" className="logo"/>
    <nav>
      <ul>
        <div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          {user.token && (
            <li><Link to="/checkout">Checkout</Link></li>
          )}
        </div>
        <div>
          <LoginLink/>
          <CartLink/>
        </div>
      </ul>
    </nav>
    </header>;
}

export default Header;