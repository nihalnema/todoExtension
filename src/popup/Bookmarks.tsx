import React from "react";
import "./Bookmark.scss";
import { LinksStorage } from "../storage/LinksStorage";

let controller = new LinksStorage();
type Props = { back: any };
type State = {
  hidden: boolean;
  bookmarkTitle: string;
  bookmarkurl: string;
  bookmarks: any;
};

class Bookmarks extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      bookmarkTitle: "",
      bookmarkurl: "",
      bookmarks: [],
    };
    const loadLinks = async () => {
      let bookmarksArray: any = await controller.getLinks();
      this.setState({ bookmarks: bookmarksArray });
      console.log(bookmarksArray);
    };
    loadLinks();
  }

  displayForm = (event) => {
    this.setState({ hidden: true });
  };

  submitForm = async (event) => {
    if (this.state.bookmarkTitle != "" && this.state.bookmarkurl != "") {
      let note = await controller.addLink(
        this.state.bookmarkTitle,
        this.state.bookmarkurl
      );
      console.log(note);
      this.setState({ bookmarkTitle: "" });
      this.setState({ bookmarkurl: "" });
    }
    this.setState({ hidden: false });
  };

  deleteLink = async (id, event) => {
    let rem = await controller.removeLink(id);
    console.log(rem);
  };

  updateTitle = (event) => {
    this.setState({ bookmarkTitle: event.target.value });
  };
  updateurl = (event) => {
    this.setState({ bookmarkurl: event.target.value });
  };
  openLink = (url, event) => {
    chrome.tabs.create({ url: url, active: false });
  };
  componentDidUpdate() {
    const loadLinks = async () => {
      let bookmarksArray: any = await controller.getLinks();
      this.setState({ bookmarks: bookmarksArray });
    };
    loadLinks();
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 5 }}>
          <button onClick={this.props.back.bind(this, "homePage")}>
            <img className="backButton" src="images/back.svg" />
          </button>
        </div>
        <div className="header">
          <div className="addNotes"> Add Bookmarks</div>
          <div className="addNoteImage">
            <img onClick={this.displayForm.bind(this)} src="images/add.png" />
          </div>
        </div>
        {this.state.hidden ? (
          <>
            <div className="form">
              <label id="titleLable">TITLE :</label>
              <input
                type="text"
                id="title"
                onChange={this.updateTitle}
              ></input>{" "}
              <br></br>
              <br></br>
              <label id="urlLable">Enter Link :</label>
              <input type="url" id="url" onChange={this.updateurl}></input>
              <br></br>
              <br></br>
              <button
                className="addButton"
                id="addButton"
                onClick={this.submitForm.bind(this)}
              >
                ADD
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        {this.state.bookmarks.length > 0 ? (
          <div className="menu">
            {this.state.bookmarks.map((item) => (
              <div className="menuItems" key={item.id}>
                <div
                  className="menuText"
                  onClick={this.openLink.bind(this, item.url)}
                >
                  {item.title}
                </div>
                <img
                  onClick={this.deleteLink.bind(this, item.id)}
                  className="menuImage"
                  src="images/cancel.png"
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ height: 62, fontWeight: 600, fontSize: 13 }}>
            Looks like you don't have any bookmarks, click on add bookmarks icon
            to add some.
          </div>
        )}
      </div>
    );
  }
}

export default Bookmarks;
