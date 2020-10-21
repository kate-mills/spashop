import React from "react";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

import Header from './components/Header'
import Alert from './components/Alert'
import PrivateRoute from './components/PrivateRoute'

import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'


const App = () => {
  return(
    <Router>
      <Header/>
      <Alert/>
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/cart"><Cart/></Route>
        <PrivateRoute path="/checkout"><Checkout/></PrivateRoute>
        <Route path="/login"><Login/></Route>
        <Route path="/products" exact><Products/></Route>
        <Route path="/products/:id"><ProductDetails/></Route>
        <Route path="*"><Error/></Route>
      </Switch>
    </Router>
  )
}

export default App;
