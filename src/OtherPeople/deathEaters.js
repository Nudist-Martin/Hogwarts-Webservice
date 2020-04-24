import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import modelInstance from "../data/MagicModel";

class DeathEaters extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      peopleList: []
    };
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    modelInstance
      .fetchData("characters")
      .then(people => {
        var deList = [];

        for (var x in people) {
          if (people[x].deathEater === true) {
            deList.push(people[x]);
          }
        }
        this.setState({
          status: "LOADED",
          peopleList: deList
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading spells...</em>;
      case "LOADED":
        return (
          <div className="sorted">
            <br />
            <div className="btn-place" align="center">
              <Link to="/otherPeople">
                <button type="button" className="btn btn-outline-light">
                  Go Back
                </button>
              </Link>
            </div>
            <br />
            <div className="deatheaterLogo row">
              <p className="col-12 headlineD" align="center">
                <br />
                <br />
                Here is a list of all Death Eaters
              </p>

              <div id="people">
                <div id="deathEaterList">
                  {this.state.peopleList.map(person => (
                    <p id="deatheaterPeopleList" key={person._id}>
                      {person.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <b>Failed to load data, please try again</b>;
    }
  }
}

export default DeathEaters;
