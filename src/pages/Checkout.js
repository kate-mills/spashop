import React from "react";
import {CartContext} from '../context/cart'
import {UserContext} from '../context/user'
import {useHistory} from 'react-router-dom'
import EmptyCart from '../components/Cart/EmptyCart'

//react-stripe-elements 
import {CardElement, StripeProvider, Elements, injectStripe} from 'react-stripe-elements'


import submitOrder from '../strapi/submitOrder'

const Checkout= (props) => {
  const {cart, total, clearCart} = React.useContext(CartContext);
  const {user, showAlert, hideAlert, alert} = React.useContext(UserContext);

  const history = useHistory();

  //state values
  const [name, setName] = React.useState(''); 
  const [error, setError] = React.useState('');

  const isEmpty = !name || alert.show;

  const handleSubmit = async (e)=>{
    showAlert({msg: "submitting order... please wait", show: true})
    e.preventDefault();
    const response = await props.stripe.createToken().catch(error =>console.log(error))
    const {token} = response;
    if(token){
      setError('');
      const {id} = token;
      let order = await submitOrder({name:name, total:total, items:cart, stripeTokenId:id, userToken: user.token})
      if(order) {
        showAlert({msg: 'Thank you for shopping with Spa Shop!'});
        clearCart();
        history.push('/');
        return;
      }
      else{
        showAlert({msg: 'there was an error with your order. please try again!', type: 'danger'})
      }
    }
    else{
      hideAlert()
      setError(response.error.message)
    }
  }

  if(cart.length < 1){
    return <EmptyCart/>
  }
  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>order total: <span> ${total}</span></h3>

        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input type="text" id="name" value={name} onChange={ (e)=>{setName(e.target.value)} }/>
        </div>
        {/* end single input */}

        {/* credit card input */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit Card</label>
          <p className="stripe-info">
            To test enter credit card: <span>4242 4242 4242 4242</span>
            <br/>
            Enter any 5 digits for the zip code
            <br/>
            Enter any 3 digits for the CVC
          </p>
        </div>

        {/* STRIPE ELEMENT */}
        <CardElement className="card-element"/>

        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}

        {/* empty value */}
        {
          isEmpty ? <p className="form-empty">{!name &&  "please fill out name field"}</p> : <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary btn-block">
              submit
            </button>
        }
        {/* end credit card input */}


      </form>
    </section>
  )
}

const CardForm = injectStripe(Checkout)

const StripeWrapper = ()=>{
  return <StripeProvider
    apiKey="pk_test_51GwUANHyNLlIiu0twVvj2lWFxr6W0d1pnVuECB80xQ7f88m7RFbz62dCco5l87hfxo8nomcdA741uJcViiKoTef500aHcKpqgl">
    <Elements>
      <CardForm></CardForm>
    </Elements>
  </StripeProvider>
}

export default StripeWrapper;

