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
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
    const newFormDB = await firebase
      .firestore()
      .collection("notes")
      .add({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    const newID = newFormDB.id;

    await this.setState({ notes: [...this.state.notes, note] });

    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);

    await firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete()
      .then(function () {
        this.setState({
          notes: this.state.notes.filter((_note) => _note !== note),
        });
        if (this.state.selectedNoteIndex === noteIndex)
          this.setState({ selectedNoteIndex: null, selectedNote: null });
        else {
          this.state.notes.length > 1
            ? this.selectNote(
                this.state.notes[this.state.selectedNoteIndex - 1],
                this.state.selectedNoteIndex - 1
              )
            : this.setState({ selectedNoteIndex: null, selectNote: null });
        }
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  };
}
