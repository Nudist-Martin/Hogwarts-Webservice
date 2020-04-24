import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../firebase";

class Home extends Component {
  logout = () => {
    auth.signOut().then(() => {
      this.props.history.push("/")
    })
  }
  render() {
    return (
      <div className="sorting" align="center">
        <div className="card" id="spellCard">
          <Link to="/spells">
            <div className="card-body row">
              <div className="col-12 cardText">
                <h5 className="card-title">Spells</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  See all spells and add notes
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <br />

        <div className="card" id="faveCard">
         <Link to="/favouriteSpells">
           <div className="card-body row">
             <div className="col-12 cardText">
               <h5 className="card-title">Favourite Spells</h5>
               <h6 className="card-subtitle mb-2 text-muted">
                 View your saved favourite spells
               </h6>
             </div>
           </div>
         </Link>
       </div>
       <br />

        <div className="card" id="peopleCard">
          <Link to="/people/select">
            <div className="card-body row">
              <div className="col-12 cardText">
                <h5 className="card-title">House Members</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  View other students and teachers of the four houses
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <br />

        <div className="card" id="OtherPeopleCard">
          <Link to="/otherPeople">
            <div className="card-body row">
              <div className="col-12 cardText">
                <h5 className="card-title">Other People</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  View other people in the Harry Potter-Universe
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <br />

        <div className="card" id="sortingCard">
          <Link to="/search">
            <div className="card-body row">
              <div className="col-12 cardText">
                <h5 className="card-title">Change House</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Switch to another of the four houses
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <br />
        <button onClick={this.logout} className="btn btn-outline-light">Log out</button>
      </div>
    );
  }
}

export default withRouter(Home);
