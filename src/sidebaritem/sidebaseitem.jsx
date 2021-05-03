import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SidebarItemComponent extends Component {
  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;
    return (
      <div key={_index}>
        <ListItem
          className={classes.listitem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            ></ListItemText>
            <DeleteIcon
              onClick={() => this.deleteNote(_note)}
              className={classes.deleteIcon}
            ></DeleteIcon>
          </div>
        </ListItem>
      </div>
    );
  }

  deleteNote = (note) => {
    if (window.confirm(`Are you sure? ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };

  selectNote = (n, i) => this.props.selectNote(n, i);
}

export default withStyles(styles)(SidebarItemComponent);
