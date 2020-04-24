import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sorting.css";
import "bootstrap/dist/css/bootstrap.css";
import modelInstance from "../data/MagicModel";

class Sorting extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statusess
    // e.g. API data loading or error
    this.state = {
      sortedHouse: null
    };
    this.sortingHat = this.sortingHat.bind(this);
  }

  sortingHat() {
    modelInstance
      .fetchData("sortingHat")
      .then(selectedHouse =>
        this.setState({ sortedHouse: selectedHouse.toLowerCase() })
      );
  }

  componentDidMount() {
    modelInstance.addObserver(this);
    this.sortingHat();
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  render() {
    return (
      <div className="sorting" align="center">
        <h2>
          Before you can begin your adventure learning spells at Hogwarts, you
          will be sorted into one of the four houses.
        </h2>
        <p>Please choose your house:</p>

        <div className="card" id="gryffindorCard">
          <Link to="/sorted/house=?gryffindor">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Gryffindor</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Brave and Brazen
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://vignette.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png/revision/latest/scale-to-width-down/180?cb=20111112232412"
                  alt="gryffindor"
                  height="100px"
                />
              </div>
            </div>
          </Link>
        </div>

        <br />

        <div className="card" id="slytherinCard">
          <Link to="/sorted/house=?slytherin">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Slytherin</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Cunning and Ambitious
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://vignette.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png/revision/latest?cb=20111112232353"
                  alt="slytherin"
                  height="100px"
                />
              </div>
            </div>
          </Link>
        </div>

        <br />

        <div className="card" id="hufflepuffCard">
          <Link to="/sorted/house=?hufflepuff">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Hufflepuff</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Loyal and Kind
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png/revision/latest/scale-to-width-down/350?cb=20161020182518"
                  alt="hufflepuff"
                  height="100px"
                />
              </div>
            </div>
          </Link>
        </div>

        <br />

        <div className="card" id="ravenclawCard">
          <Link to="/sorted/house=?ravenclaw">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Ravenclaw</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Clever and Creative
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://vignette.wikia.nocookie.net/pottermore/images/4/40/Ravenclaw_Crest_1.png/revision/latest?cb=20140604194505"
                  alt="ravenclaw"
                  height="110px"
                />
              </div>
            </div>
          </Link>
        </div>

        <br />
        <br />

        <div className="card" id="random">
          <Link to={"/sorted/house=?" + this.state.sortedHouse}>
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Random</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Let the Sorting Hat decide!
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://vignette.wikia.nocookie.net/harrypotter/images/6/62/Sorting_Hat.png/revision/latest/scale-to-width-down/350?cb=20161120072849"
                  alt="hat"
                  height="100px"
                />
              </div>
            </div>
          </Link>
        </div>

        <br />
      </div>
    );
  }
}

export default Sorting;
