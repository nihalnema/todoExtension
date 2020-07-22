import React from "react";
import "./Notes.scss";
import { NotesStorage } from "../storage/NotesStorage";

let controller = new NotesStorage();
type Props = { back: any };
type State = { hidden: boolean; addedNote: string; notes: any };

class Notes extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      addedNote: "",
      notes: [],
    };
    const loadNotes = async () => {
      let notesArray: any = await controller.getNotes();
      this.setState({ notes: notesArray });
      console.log(notesArray);
    };
    loadNotes();
  }

  displayForm = (event) => {
    this.setState({ hidden: true });
  };

  hideForm = async (event) => {
    if (this.state.addedNote != "") {
      let note = await controller.addNote(this.state.addedNote);
      console.log(note);
      this.setState({ addedNote: "" });
    }
    this.setState({ hidden: false });
  };

  deleteNote = async (id, event) => {
    let rem = await controller.removeNote(id);
    console.log(rem);
  };

  handleChange = (event) => {
    this.setState({ addedNote: event.target.value });
  };
  componentDidUpdate() {
    const loadNotes = async () => {
      let notesArray: any = await controller.getNotes();
      this.setState({ notes: notesArray });
    };
    loadNotes();
  }

  render() {
    return (
      <div  style={{ width:300}}>
        <div>
            <img onClick={this.props.back.bind(this, "homePage")} className="backButton" src="images/back.png" />
        </div>
        <div className="header">
          <div className="addNotes"> Add Notes</div>
          <div className="addNoteImage">
            <img onClick={this.displayForm.bind(this)} src="images/add.png" />
          </div>
        </div>
        {this.state.hidden ? (
          <>
            <div className="form">
              <textarea
                rows={4}
                placeholder="Add Notes"
                className="textInput"
                value={this.state.addedNote}
                onChange={this.handleChange}
              ></textarea>
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
        {this.state.notes.length>0 ?
        <div className="menu">
          {this.state.notes.map((item) => (
            <div className="menuItems" key={item.id}>
              <div className="menuText">{item.note}</div>
              <img
                onClick={this.deleteNote.bind(this, item.id)}
                className="menuImage"
                src="images/cancel.png"
              />
            </div>
          ))}
        </div>
        :<div style={{ height: 62, fontWeight:600, fontSize:13 }}>Looks like you dont have any notes, click on add notes icon to add some.</div>
        }
      </div>
    );
  }
}

export default Notes;
