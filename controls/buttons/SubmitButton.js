import React from "react";
import Button from "./base/Button";
import "./base/button-control.css";

/**
 *
 * Component wraps the form button and provides default functionality
 * properties include
 *  commandText - a string
 *  callback - callback method to execute
 *
 */
export default class SubmitButton extends Button {
  constructor(props) {
    super(props);
    this.callback = props.callback;
    this.commandText = props.commandText;
  }

  render = () => {
    return (
      <button
        className={"btn"}
        style={{
          //   height: 40,
          //   fontSize: 14,
          //   textTransform: "capitalize",
          //   border: "1px solid #460046",
          color: "#fff",
          background: "#460046",
          border: "none",
          cursor: "pointer",
          ...this.style,
        }}
        onClick={this.callback}
      >
        {this.commandText === undefined ? `Submit` : this.commandText}
      </button>
    );
  };
}
