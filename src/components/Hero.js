import React from "react";

const Hero = ({children}) => {
  return (
    <div className="hero">
      <div className="banner">
        <h1 className="cursive">Love your skin.</h1>
        <p>embrace your choices - we do</p>
        {children}
      </div>
    </div>
  )
}
export default Hero
