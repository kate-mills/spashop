import React from 'react'
import {FaAngleDoubleUp} from 'react-icons/fa'
import {UserContext} from '../context/user'

const ScrollButton = ()=>{
  const {height} = React.useContext(UserContext);

  const scrollBackToTop = ()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return(
    <button className={ height > 150 ? "scroll-btn show-scroll-btn": "scroll-btn" }
      onClick={scrollBackToTop}
    >
      <FaAngleDoubleUp title="Back to top!"/>
    </button>
  )
}

export default ScrollButton
