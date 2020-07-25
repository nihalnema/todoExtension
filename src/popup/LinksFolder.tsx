//react component for Link Folders
import React from "react";
import "./Notes.scss";
import "./Folder.scss"
import { LinksStorage } from "../storage/LinksStorage";
import Links from "./Links";

// instance of LinksStorage
export let controller = new LinksStorage();

/**
 * @param back to go back to previous page
 */
type Props = { back: any };

/**
 * @param hidden to toggle the visibility of add folder form
 * @param addedFolder name of added folder
 * @param folder array of all link folders
 * @param pageType to toggle visibility between folders and links page
 * @param folderId ID of folder
 */
type State = {
  hidden: boolean;
  addedFolder: string;
  folder: any;
  pageType: string;
  folderId: number;
  folderName: string;

};

//component class for LinksFolder
class LinksFolder extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      addedFolder: "",
      folder: [],
      pageType: "folder",
      folderId: undefined,
      folderName: undefined,
    };
    this.loadFolders();
  }

  /**
   * load all the folders containing links
   */
  loadFolders = async () => {
    let folderArray: any = await controller.getFolder();
    this.setState({ folder: folderArray });
    console.log(folderArray);
  };

  /**
   * to toggle visibility between folders and links page
   * @param id ID of folder
   * @param event Event which invoked the function.
   * @param name name of folder
   */
  viewLinks = (id, name, event) => {
    if (id != undefined) {
      this.setState((prevState) => ({
        pageType: "links",
        folderId: id,
        folderName:name
      }));
    } else {
      this.setState((prevState) => ({
        pageType: "folder",
        folderId: undefined,
        folderName:undefined
      }));
    }
  };

  /**
   * sets the hidden state variable to false, to render addFolder div
   * @param event which invoked the function
   */
  displayFolderForm = (event) => {
    this.setState({ hidden: false });
  };

  /**
   * adds folder 
   * @param event which invoked the function
   */
  addFolder = async (event) => {
    if (this.state.addedFolder != "") {
      // adds folder to storage
      let folder = await controller.addFolder(this.state.addedFolder);
      console.log(folder);
      // state addedFolder is set to "" after adding folder
      this.setState({ addedFolder: "" });
      // state hidden set to true to hide the addFolders form
      this.setState({ hidden: true });
    }
  };

  /**
   * deletes a folder from storage
   * @param id ID of folder which is to be deleted
   * @param event which invoked the function
   */
  deleteFolder = async (id, event) => {
    let rem = await controller.removeFolder(id);
    console.log(rem);
  };

  /**
   *  all link folders being loaded each time any of the state gets updated
   */
  componentDidUpdate() {
    const loadNotes = async () => {
      let folderArray: any = await controller.getFolder();
      this.setState({ folder: folderArray });
    };
    loadNotes();
  }

  // to render LinksFolder in DOM
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
            <div className="addNotes">Link Folders</div>
            <div className="addNoteImage">
              <img
                onClick={this.displayFolderForm.bind(this)}
                src="images/addFolder.png"
              />
            </div>
          </div>
          {!this.state.hidden ? (
            <>
              <div className="form">
                <textarea
                  rows={1}
                  placeholder="Folder Name"
                  className="textInput"
                  value={this.state.addedFolder}
                  onChange={(event) => {
                    this.setState({ addedFolder: event.target.value });
                  }}
                ></textarea>
                <button
                  className="cancelButton"
                  onClick={() => this.setState({ hidden: true })}
                >
                  CANCEL
                </button>
                <button
                  className="addButton"
                  id="addButton"
                  onClick={this.addFolder.bind(this)}
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
                <div className="folderItems" key={item.id}>
                  <img className="folderImage" src="images/folder.png"/>
                  <div
                    className="folderText"
                    onClick={this.viewLinks.bind(this, item.id,item.folderName)}
                  >
                    {item.folderName}
                  </div>
                  <img
                    onClick={this.deleteFolder.bind(this, item.id)}
                    className="cancelImage"
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
            <Links back={this.viewLinks} folderId={this.state.folderId} folderName={this.state.folderName}/>
        )
    }
  }
}

export default LinksFolder;
