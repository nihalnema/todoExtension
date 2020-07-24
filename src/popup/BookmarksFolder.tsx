import React from "react";
import "./Notes.scss";
import { LinksStorage } from "../storage/LinksStorage";
import Bookmarks from "./Bookmarks";

let controller = new LinksStorage();
type Props = { back: any };
type State = {
  hidden: boolean;
  addedFolder: string;
  folder: any;
  pageType: string;
  folderId: number;
};

class BookmarksFolder extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      addedFolder: "",
      folder: [],
      pageType: "folder",
      folderId: undefined,
    };

    const loadFolders = async () => {
      let folderArray: any = await controller.getFolder();
      this.setState({ folder: folderArray });
      console.log(folderArray);
    };
    loadFolders();
  }

  viewLinks = (id, event) => {
    if (id != undefined) {
      this.setState((prevState) => ({
        pageType: "links",
        folderId: id,
      }));
    } else {
      this.setState((prevState) => ({
        pageType: "folder",
        folderId: undefined,
      }));
    }
  };

  displayForm = (event) => {
    this.setState({ hidden: true });
  };

  hideForm = async (event) => {
    if (this.state.addedFolder != "") {
      let folder = await controller.addFolder(this.state.addedFolder);
      console.log(folder);
      this.setState({ addedFolder: "" });
      this.setState({ hidden: false });
    }
  };

  deleteFolder = async (id, event) => {
    let rem = await controller.removeFolder(id);
    console.log(rem);
  };

  handleChange = (event) => {
    this.setState({ addedFolder: event.target.value });
  };

  componentDidUpdate() {
    const loadNotes = async () => {
      let folderArray: any = await controller.getFolder();
      this.setState({ folder: folderArray });
    };
    loadNotes();
  }

  render() {
    if (this.state.pageType == "folder") {
      return (
        <div style={{ width: 300 }}>
          <div>
            <img
              onClick={this.props.back.bind(this, "homePage")}
              className="backButton"
              src="images/back.png"
            />
          </div>
          <div className="header">
            <div className="addNotes"> Add Folders</div>
            <div className="addNoteImage">
              <img onClick={this.displayForm.bind(this)} src="images/addFolder.png" />
            </div>
          </div>
          {this.state.hidden ? (
            <>
              <div className="form">
                <textarea
                  rows={1}
                  placeholder="Folder Name"
                  className="textInput"
                  value={this.state.addedFolder}
                  onChange={this.handleChange}
                ></textarea>
                <button
                  className="cancelButton"
                  onClick={() => this.setState({ hidden: false })}
                >
                  CANCEL
                </button>
                <button
                  className="addButton"
                  id="addButton"
                  onClick={this.hideForm.bind(this)}
                >
                  ADD
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          {this.state.folder.length > 0 ? (
            <div className="note">
              {this.state.folder.map((item) => (
                <div className="noteItems" key={item.id}>
                  <div
                    className="noteText"
                    onClick={this.viewLinks.bind(this, item.id)}
                  >
                    {item.folderName}
                  </div>
                  <img
                    onClick={this.deleteFolder.bind(this, item.id)}
                    className="noteImage"
                    src="images/cancel.png"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: 62, fontWeight: 600, fontSize: 13 }}>
              Looks like you dont have any Folder, click on add folder icon to
              add some.
            </div>
          )}
        </div>
      );
    }else{
        return(
            <Bookmarks back={this.viewLinks} folderId={this.state.folderId}/>
        )
    }
  }
}

export default BookmarksFolder;
