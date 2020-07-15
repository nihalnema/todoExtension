//React component for Home page of Extension

import React from "react";
import "./HomePage.scss";

// Componect class for Home page.
class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isClicked:false
        }
    }

    changeColor=()=>{
        
        this.setState({
            isClicked: true
        });
    }
  render() {
    return (
      <div className="homePage">
        <div className="toDo" onClick = {this.changeColor}>ToDo</div>
        <div className="toDo" onClick = {this.changeColor}>Bookmarks</div>
      </div>
    );
  }
}

export default HomePage;
