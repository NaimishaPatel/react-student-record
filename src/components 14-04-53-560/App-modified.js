import React, { Component } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alphabetical, setAlphabetical] = useState("az");
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=60")
      .then((response) => {
        console.log(response.data.results);
        this.setState({ users: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableBody>
      {results.map((person) => (
        <TableRow key={person.id.value}>
          <TableCell component="th" scope="row">
            {person.name.first}
          </TableCell>
          <TableCell align="right">{person.name.last}</TableCell>
          <TableCell align="center">
            {person.location.street.name +
              "," +
              person.location.street.number +
              "," +
              person.location.state +
              "," +
              person.location.country}
          </TableCell>
          <TableCell align="right">
            <img src={person.picture.thumbnail} />
          </TableCell>
          <TableCell align="center">{person.email}</TableCell>
          <TableCell align="right">{person.dob.date}</TableCell>
          <TableCell align="right">
            <Button variant="contained" color="primary">
              <Link
                style={{ color: "white" }}
                to={`/user-detail/${person.login.uuid}`}
              >
                View Details
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

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
      filteredUsers = this.state.users.filter((u) =>
        u.name.first.startsWith(this.state.searchTerm)
      );

    const userNames = filteredUsers.map((u) => {
      return <User key={u.email} name={u.name.first} age={u.dob.age} />;
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for user:
            <input
              type="text"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <select
          name="alphabetical"
          value={this.state.alphabetical}
          onChange={this.handleChange}
        >
          <option selected value="az">
            A to Z
          </option>
          <option value="za">Z to A</option>
        </select>

        {userNames}
      </div>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h3>{this.props.age}</h3>
      </div>
    );
  }
}

export default App;
