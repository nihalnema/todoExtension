// React component for Notes page
import React from "react";
import "./Notes.scss";
import { controller } from "./NotesFolder";

/**
 * @param back to go back to previous component
 * @param folderId ID of folder containing notes
 * @param folderName name of folder
 */
type Props = { back: any; folderId: number; folderName:string };

/**
 * @param hidden to toggle visibility of add notes form
 * @param addedNote to store the current input from textarea
 * @param notes array of all notes in folder
 */
type State = { hidden: boolean; addedNote: string; notes: any };

// component class for Notes
class Notes extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      addedNote: "",
      notes: [],
    };
    this.loadNotes();
  }

  /**
   * load all the notes from a folder
   */
  loadNotes = async () => {
    // get all the notes in notesArray corresponding to folderId
    let notesArray: any = await controller.getNotes(this.props.folderId);
    this.setState({ notes: notesArray });
    console.log(notesArray);
  };

  /**
   * sets the hidden state variable to false, to render addNotes div
   * @param event which invoked the function
   */
  displayForm = (event) => {
    this.setState({ hidden: false });
  };

  /**
   * add notes to the folder
   * @param event which invoked the function
   */
  addNote = async (event) => {
    if (this.state.addedNote != "") {
      //adds notes to the correspoding folderId
      let note = await controller.addNote(this.props.folderId,this.state.addedNote);
      console.log(note);
      //state addedNote changed to "" after note gets added to folder
      this.setState({ addedNote: "" });
      //form gets hidden after note gets added to folder
      this.setState({ hidden: true });
    }
  };

  /**
   * deletes a note from folder
   * @param id ID of note which is to be deleted
   * @param event which invoked the function
   */
  deleteNote = async (id, event) => {
    let rem = await controller.removeNote(this.props.folderId, id);
  };

  /**
   *  notes being loaded each time any of the state gets updated 
   */
  componentDidUpdate() {
    const loadNotes = async () => {
      let notesArray: any = await controller.getNotes(this.props.folderId);
      this.setState({ notes: notesArray });
    };
    loadNotes();
  }

  /**
   * to render Notes component in the DOM
   */
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
          <div className="addNotes">{this.props.folderName} Notes</div>
          <div className="addNoteImage">
            <img onClick={this.displayForm.bind(this)} src="images/addNote.png" />
          </div>
        </div>
        {!this.state.hidden ? (
          <>
            <div className="form">
              <textarea
                rows={4}
                placeholder="Add Notes"
                className="textInput"
                value={this.state.addedNote}
                onChange={(event) =>
                  this.setState({ addedNote: event.target.value })
                }
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
                onClick={this.addNote.bind(this)}
              >
                ADD
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        {this.state.notes.length > 0 ? (
          <div className="note">
            {this.state.notes.map((item) => (
              <div className="noteItems" key={item.id}>
                <div className="noteText">{item.note}</div>
                <img
                  onClick={this.deleteNote.bind(this, item.id)}
                  className="noteImage"
                  src="images/cancel.png"
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ height: 62, fontWeight: 600, fontSize: 13 }}>
            Looks like you dont have any notes, click on add notes icon to add
            some.
          </div>
        )}
      </div>
    );
  }
}

export default Notes;
