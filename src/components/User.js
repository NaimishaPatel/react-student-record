import React, { Component } from "react";

export default class User extends Component {
  render() {
    return (
      <div className="ui link cards" style={{ padding: "5px" }}>
        <div className="card horizontal">
          <div className="ui centered medium image">
            <img alt={this.props.image} src={this.props.image} />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>

            <div className="description">
              <i className="map marker alternate icon"></i> {this.props.address}
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="envelope icon"></i> {this.props.email}
            </span>{" "}
            <br />
            <span>
              <i className="user icon"></i>Age: {this.props.age}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
