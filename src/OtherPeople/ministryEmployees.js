import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import modelInstance from "../data/MagicModel";

class ministryEmployees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "LOADING",
      peopleList: [],
      deathEaterList: []
    };
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    modelInstance
      .fetchData("characters")
      .then(people => {
        var deList = [];

        for (var x in people) {
          if (people[x].ministryOfMagic === true) {
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
        return <em>Loading members...</em>;
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
            <div className="ministryLogo row">
              <p className="col-12 headlineM" align="center">
                <br />
                <br />
                Here is a list of all Ministry of Magic members
              </p>

              <div id="people">
                <div id="ministryList">
                  {this.state.peopleList.map(person => (
                    <p id="minPeopleList" key={person._id}>
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

export default ministryEmployees;
