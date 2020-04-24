import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./otherPeople.css";
import "bootstrap/dist/css/bootstrap.css";

class OtherPeople extends Component {
  render() {
    return (
      <div className="sorting" align="center">
        <div className="card" id="deathEaterCard">
          <Link to="/deatheaters">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Death Eaters</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  See a list of all known Death Eaters
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://kidsartuk.com/wp-content/uploads/2017/02/Death-Eater-Dark-Mark.png"
                  alt="darkmark"
                  height="125px"
                />
              </div>
            </div>
          </Link>
        </div>
        <br />

        <Link to="/ministryemployees">
          <div className="card" id="ministryCard">
            <div className="card-body row">
              <div className="col-6 cardText">
                <h5 className="card-title">Ministry of Magic</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  View employees at the Ministry of Magic
                </h6>
              </div>
              <div className="col-6">
                <img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/807aabef-ed62-42f9-9329-4983cc36398b/d7exxnm-026267c1-51ec-47e9-9d9f-a9644d890581.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwN2FhYmVmLWVkNjItNDJmOS05MzI5LTQ5ODNjYzM2Mzk4YlwvZDdleHhubS0wMjYyNjdjMS01MWVjLTQ3ZTktOWQ5Zi1hOTY0NGQ4OTA1ODEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.G4n6-iSOSDOTHTlr8aXOZJLXHTVivrO0EF0WaxiCYYU"
                  alt="ministrylogo"
                  height="110px"
                  width="140px"
                />
              </div>
            </div>
          </div>
        </Link>
        <br />
        <br />
        <Link to="/home">
          <button type="button" className="btn btn-outline-light">
            Homepage
          </button>
        </Link>
      </div>
    );
  }
}

export default OtherPeople;
