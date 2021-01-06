import React from "react";
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import {formatPrice} from '../../utils/helpers'


const Product = (props) => {
  const { id, title, image, price, max} = props
  console.log('max', max)

  return <article className="product">
    <div className="img-container">
      <img src={image} alt={title}/>
      <Link to={`/products/${id}`} className="btn btn-primary product-link">details</Link>
    </div>
    <div className="product-footer">
      <p className="product-title">{title || "Sorry - out of stock"}</p>
      <p className="product-price">{formatPrice(price) || 0}</p>
    </div>
    </article>
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}
Product.defaultProps = {
  title: "Sorry - Out of Stock",
  image:null,
  price: 0.00,
}
export default Product
