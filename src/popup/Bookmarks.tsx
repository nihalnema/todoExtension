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
  alertMessage: boolean;
};

class Bookmarks extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      bookmarkTitle: "",
      bookmarkurl: "",
      bookmarks: [],
      alertMessage: false,
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

  isValidURL = (str) => {
    var res = str.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  submitForm = async (event) => {
    if (this.state.bookmarkTitle != "" && this.state.bookmarkurl != "") {
      if (this.isValidURL(this.state.bookmarkurl)) {
        let url = this.state.bookmarkurl;
        if (!url.includes("https://")) {
          url = "https://" + url;
        }
        this.setState({ alertMessage: false });
        let note = await controller.addLink(this.state.bookmarkTitle, url);
        this.setState({ hidden: false });
        console.log(note);
        this.setState({ bookmarkTitle: "" });
        this.setState({ bookmarkurl: "" });
      } else this.setState({ alertMessage: true });
    }
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
      <div style={{ width:300}}>
        <div>
            <img onClick={this.props.back.bind(this, "homePage")} className="backButton" src="images/back.png" />
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
              <label id="titleLable">Title :</label>
              <input
                type="text"
                id="title"
                onChange={this.updateTitle}
                placeholder="title"
              ></input>{" "}
              <br></br>
              <br></br>
              <label id="urlLable">Enter Link :</label>
              <input
                type="url"
                id="url"
                onChange={this.updateurl}
                placeholder="https://example.com"
              ></input>
              <br></br>
              <br></br>
              {this.state.alertMessage ? (
                <div className="alertMessage">Enter Valid URL</div>
              ) : (
                <></>
              )}
              <button
                className="cancelButton"
                onClick={() =>
                  this.setState({ hidden: false, alertMessage: false })
                }
              >
                CANCEL
              </button>
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
          <div className="link">
            {this.state.bookmarks.map((item) => (
              <div className="linkItems" key={item.id}>
                <div
                  className="linkText"
                  onClick={this.openLink.bind(this, item.url)}
                >
                  {item.title}
                </div>
                <img
                  onClick={this.deleteLink.bind(this, item.id)}
                  className="linkImage"
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
