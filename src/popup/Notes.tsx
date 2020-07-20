import React from "react";
import "./Notes.scss";

type Props = {};
type State = { hidden: boolean; addedNote: string; notes: any };

class ToDoList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      addedNote: "",
      notes: [
        { id: 1, note: "Im going to add notes to my extension" },
        { id: 2, note: "dkfjnori" },
        { id: 3, note: "awugrydkfjnori" },
        { id: 4, note: "dkfjnoriasyge" },
        { id: 5, note: "dkfjns,dmfwori" },
        { id: 6, note: "jxnvfdkfjnori" },
      ],
    };
  }

  displayForm = (event) => {
    this.setState({ hidden: true });
  };
  hideForm = (event) => {
    this.setState({ hidden: false });
    console.log(this.state.addedNote);
    this.setState({ addedNote: "" });
  };
  deleteNote = (id, event) => {};

  handleChange = (event) => {
    this.setState({ addedNote: event.target.value });
  };
  componentDidUpdate() {}

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default ToDoList;
