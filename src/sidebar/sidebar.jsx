import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebaseitem";

class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    };
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? "Cancel" : "New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter Note"
              onKeyUp={(e) => this.updataTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarComponent
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectedNote={this.selectedNote}
                  deleteNote={this.deleteNote}
                ></SidebarComponent>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updataTitle = (text) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        title: text,
      };
    });
  };

  newNote = () => {
    console.log(this.state);
  };

  selectedNote = () => {
    console.log("select note");
  };

  deleteNote = () => {
    console.log("delete note");
  };
}

export default withStyles(styles)(SidebarComponent);
