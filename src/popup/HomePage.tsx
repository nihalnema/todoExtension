//React component for Home page of Extension

import React from "react";
import "./HomePage.scss";
import NotesFolder from "./NotesFolder";
import BookmarksFolder from "./BookmarksFolder";
type Props = {};
type State = { pageType: string };
// Componect class for Home page.
class HomePage extends React.Component<Props, State> {
  state = { pageType: "homePage" };

  /**
   * Change the state of page depending on the event which invoked it.
   * @param data To set state of page according to data value.
   * @param event Event which invoked the function.
   */
  popupMenu = (data, event) => {
    if (data == "homePage") {
      this.setState((prevState) => ({
        pageType: "homePage",
      }));
    } else if (data == "notes") {
      this.setState((prevState) => ({
        pageType: "notes",
      }));
    } else {
      this.setState((prevState) => ({
        pageType: "bookmarks",
      }));
    }
  };

  render() {
    if (this.state.pageType == "homePage") {
      return (
        <div className="home">
          <div className="mainDiv" onClick={this.popupMenu.bind(this, "notes")}>
            <img className="leftImage" src="images/note.png" />
            Notes
            <img className="rightImage" src="images/next.png" />
          </div>
          <div
            className="mainDiv"
            onClick={this.popupMenu.bind(this, "bookmarks")}
          >
            <img className="leftImage" src="images/bookmark.png" />
            Bookmarks
            <img className="rightImage" src="images/next.png" />
          </div>
        </div>
      );
    } else if (this.state.pageType == "notes") {
      return (
        <div>
          <NotesFolder back={this.popupMenu} />
        </div>
      );
    } else if (this.state.pageType == "bookmarks") {
      return (
        <div>
          <BookmarksFolder back={this.popupMenu} />
        </div>
      );
    }
  }
}

export default HomePage;
