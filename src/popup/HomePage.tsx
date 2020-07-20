//React component for Home page of Extension

import React from "react";
import "./HomePage.scss";

// Componect class for Home page.
class HomePage extends React.Component {
   
  render() {
    return (
      <div className="homePage">
        <div className="notes">Notes</div>
        <div className="notes">Bookmarks</div>
      </div>
    );
  }
}

export default HomePage;
