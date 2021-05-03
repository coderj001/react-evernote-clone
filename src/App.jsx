import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }
  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote && (
          <EditorComponent
            selectNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        )}
      </div>
    );
  }

  selectNote = (note, index) =>
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, note) => {
    console.log("id", id);
    console.log("note", note);
  };
}
