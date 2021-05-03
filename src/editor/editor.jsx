import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.selectNote.body,
      title: this.props.selectNote.title,
      id: this.props.selectNote.id,
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectNote.body,
        title: this.props.selectNote.title,
        id: this.props.selectNote.id,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          type="text"
          className={classes.titleInput}
          placeholder="Note Title ... "
          value={this.state.title ? this.state.title : ""}
          onChange={(e) => {
            this.updateTitle(e.target.value);
          }}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    );
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 1500);
  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
  };
}
export default withStyles(styles)(EditorComponent);
