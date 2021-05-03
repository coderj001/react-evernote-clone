import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

class SidebarItemComponent extends Component {
  render() {
    return (
      <div>
        <h1>sidebaritem</h1>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarItemComponent);
