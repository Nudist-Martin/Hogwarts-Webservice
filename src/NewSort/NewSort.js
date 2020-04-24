import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NewSort.css";
import "bootstrap/dist/css/bootstrap.css";

class NewSort extends Component {
  render() {
    return (
      <div className="sorting" align="center">
        <h1>Please choose your new house:</h1>
        <br />
        <div className="card" id="gryffindorCard">
          <Link to="/sorted/gryffindor">
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
          <Link to="/sorted/slytherin">
            <div className="card-body row">
              <div className="col-6 cardText" id="slytherin">
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
          <Link
            to={"/sorted/hufflepuff"}
          >
            <div className="card-body row">
              <div className="col-6 cardText" id="hufflepuff">
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
          <Link to="/sorted/ravenclaw">
            <div className="card-body row">
              <div className="col-6 cardText" id="ravenclaw">
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

        <div className="card">
          <Link to="/sorted">
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

export default NewSort;
