import React, { Component } from "react";
import axios from "axios";
import User from "./components/User";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [], searchTerm: "", alphabetical: "az" };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=60")
      .then((response) => {
        console.log(response.data.results);
        this.setState({ users: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    let sortedUsers;

    if (this.state.alphabetical === "az") {
      console.log("sort");
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
    } else {
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first < b.name.first ? 1 : -1
      );
    }

    let filteredUsers = sortedUsers;

    if (this.state.searchTerm)
      filteredUsers = this.state.users.filter(
        (u) =>
          u.name.first
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          u.name.last
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          u.location.street.name
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          u.location.city
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          u.location.state
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase()) ||
          u.location.country
            .toLowerCase()
            .includes(this.state.searchTerm.toLowerCase())
      );

    const userNames = filteredUsers.map((u) => {
      return (
        <div className="ui grid" key={u.email}>
          <div className="three column row">
            <User
              className="ui segment"
              name={u.name.title + ". " + u.name.first + " " + u.name.last}
              address={
                u.location.street.number +
                " " +
                u.location.street.name +
                ", " +
                u.location.city +
                ", " +
                u.location.state +
                ", " +
                u.location.country +
                ", " +
                u.location.postcode
              }
              email={u.email}
              image={u.picture.large}
              age={u.dob.age}
            />
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="Alignment">
          <h1 className="ui header">Student Directory</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="ui search">
              <div className="ui left icon input">
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search Student"
                  name="searchTerm"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                />
                <i className="user icon" />
              </div>
            </div>
          </form>
          <div className="Sort">
            Sort
            <i className="sort icon"></i>
            <select
              name="alphabetical"
              value={this.state.alphabetical}
              onChange={this.handleChange}
            >
              <option defaultValue value="az">
                A to Z
              </option>
              <option value="za">Z to A</option>
            </select>
          </div>
        </div>
        <div className="ui grid Alignment">{userNames}</div>
      </div>
    );
  }
}

export default App;
