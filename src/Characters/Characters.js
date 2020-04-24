import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Characters.css";
import "bootstrap/dist/css/bootstrap.css";
import modelInstance from "../data/MagicModel";

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      students: [],
      house: null
    };
    this.loadPeople = this.loadPeople.bind(this);
  }

  update = () => {
    this.setState({
      house: this.props.match.params.house
    });
    this.loadPeople(this.props.match.params.house);
  };

  loadPeople = selHouse => {
    var house = modelInstance.toTitleCase(selHouse);
    modelInstance
      .fetchData("characters", house)
      .then(people => {
        this.setState({
          status: "LOADED",
          students: people
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  checkChange(input) {
    if (input !== this.state.house) {
      this.setState({
        house: input
      });
      this.loadPeople(input);
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this);
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    var studentList;
    switch (this.state.status) {
      case "LOADING":
        studentList = <em>Loading students...</em>;
        this.loadPeople(this.props.match.params.house);
        break;
      case "LOADED":
        studentList = this.state.students.map(student => (
          <li key={student._id}>{student.name}</li>
        ));
        break;

      default:
        studentList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="characters">
      <br />
        <h3
          align="center"
          onChange={this.checkChange(this.props.match.params.house)}
        >
          Click a house crest on the left to view members of that house!{" "}
        </h3>
        <br />
        <h2 align="center">
          {modelInstance.toTitleCase(this.props.match.params.house)} house
        </h2>
        <br /><br />
        <div className="row" id="houses">
          <div className="col-2">
            <Link to="/people/gryffindor">
              <img
                src="https://vignette.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png/revision/latest/scale-to-width-down/180?cb=20111112232412"
                alt="gryffindor"
                height="100px"
              />
            </Link>
            <br />

            <Link to="/people/slytherin">
              <img
                src="https://vignette.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png/revision/latest?cb=20111112232353"
                alt="slytherin"
                height="100px"
              />
            </Link>
            <br />

            <Link to="/people/hufflepuff">
              <img
                src="https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png/revision/latest/scale-to-width-down/350?cb=20161020182518"
                alt="hufflepuff"
                height="100px"
              />
            </Link>
            <br />

            <Link to="/people/ravenclaw">
              <img
                src="https://vignette.wikia.nocookie.net/pottermore/images/4/40/Ravenclaw_Crest_1.png/revision/latest?cb=20140604194505"
                alt="ravenclaw"
                height="110x"
              />
            </Link>
            <br />
            <br />
            <Link to="/home">
              <button type="button" className="btn btn-outline-light">
                Back to Homepage
              </button>
            </Link>
          </div>

          <div className="col-10">
            <ul id="students">{studentList}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Characters;
