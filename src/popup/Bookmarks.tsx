// React component for Links page
import React from "react";
import "./Bookmark.scss";
import { controller } from "./BookmarksFolder";

/**
 * @param back to go back to previous component
 * @param folderId ID of folder containing links
 * @param folderName name of folder
 */
type Props = { back: any; folderId: number ; folderName:string };

/**
 * @param hidden to toggle visibility of add links form
 * @param bookmarkTitle to store the current input title of link
 * @param bookmarkurl to store the current input url of link
 * @param bookmarks array of all links in folder
 * @param alertMessage to know if entered URL is valid or not
 */
type State = {
  hidden: boolean;
  bookmarkTitle: string;
  bookmarkurl: string;
  bookmarks: any;
  alertMessage: boolean;
};

//Component class for Links
class Bookmarks extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      bookmarkTitle: "",
      bookmarkurl: "",
      bookmarks: [],
      alertMessage: false,
    };
    this.loadLinks();
  }

  /**
   * load all the links from a folder
   */
  loadLinks = async () => {
    // get all the links in linksArray corresponding to folderId
    let bookmarksArray: any = await controller.getLinks(this.props.folderId);
    this.setState({ bookmarks: bookmarksArray });
    console.log(bookmarksArray);
  };

  /**
   * sets the hidden state variable to false, to render addLinks div
   * @param event which invoked the function
   */
  displayForm = (event) => {
    this.setState({ hidden: false });
  };

  // to check whether the entered link is valid or not
  isValidURL = (str) => {
    var res = str.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  };

  /**
   * add links to the folder
   * @param event which invoked the function
   */
  addLink = async (event) => {
    if (this.state.bookmarkTitle != "" && this.state.bookmarkurl != "") {
      if (this.isValidURL(this.state.bookmarkurl)) {
        let url = this.state.bookmarkurl;
        if (!url.includes("https://")) {
          //adding "https://" to the begining of url if not present
          url = "https://" + url;
        }
        this.setState({ alertMessage: false });
        let note = await controller.addLink(
          this.props.folderId,
          this.state.bookmarkTitle,
          url
        );
        this.setState({ hidden: true });
        console.log(note);
        this.setState({ bookmarkTitle: "" });
        this.setState({ bookmarkurl: "" });
      } else this.setState({ alertMessage: true });
    }
  };

  /**
   * deletes a link from folder
   * @param id ID of link which is to be deleted
   * @param event which invoked the function
   */
  deleteLink = async (id, event) => {
    let rem = await controller.removeLink(this.props.folderId, id);
    console.log(rem);
  };

  // opens the link in new tab
  openLink = (url, event) => {
    chrome.tabs.create({ url: url, active: false });
  };

  /**
   *  links being loaded each time any of the state gets updated
   */
  componentDidUpdate() {
    const loadLinks = async () => {
      let bookmarksArray: any = await controller.getLinks(this.props.folderId);
      this.setState({ bookmarks: bookmarksArray });
    };
    loadLinks();
  }

  // to render Link component in DOM
  render() {
    return (
      <div style={{ width: 300 }}>
        <div>
          <img
            onClick={this.props.back.bind(this, undefined)}
            className="backButton"
            src="images/back.png"
          />
        </div>
        <div className="header">
          <div className="addNotes">{this.props.folderName} Links</div>
          <div className="addNoteImage">
            <img onClick={this.displayForm.bind(this)} src="images/addBookmark.png" />
          </div>
        </div>
        {!this.state.hidden ? (
          <>
            <div className="form">
              <label id="urlLable">Enter Title :</label>
              <input
                type="text"
                id="title"
                onChange={(event) => {
                  this.setState({ bookmarkTitle: event.target.value });
                }}
                placeholder="title"
              ></input>{" "}
              <br></br>
              <br></br>
              <label id="urlLable">Enter Link :</label>
              <input
                type="url"
                id="url"
                onChange={(event) => {
                  this.setState({ bookmarkurl: event.target.value });
                }}
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
                  this.setState({ hidden: true, alertMessage: false })
                }
              >
                CANCEL
              </button>
              <button
                className="addButton"
                id="addButton"
                onClick={this.addLink.bind(this)}
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
