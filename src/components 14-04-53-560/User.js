import React from "react";

export default class User extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h3>{this.props.age}</h3>
      </div>
    );
  }
}
