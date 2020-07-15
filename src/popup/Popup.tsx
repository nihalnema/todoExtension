//React component for Home page of Extension

import React from "react";
import "./Popup.scss"
import HomePage from './HomePage'

// Componect class for Home page.
class Popup extends React.Component{
  render(){
    return(
      <div>
        <div className="heading">TO DO EXTENSION</div>
        <HomePage/>
      </div>
      
    )
  }



}

export default Popup;
