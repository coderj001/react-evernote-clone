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
}
export default withStyles(styles)(EditorComponent);
