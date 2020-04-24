import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./FaveSpells.css";
import { auth, database } from "../firebase";

class FavoritesList extends React.Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    if (!auth.currentUser) {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.getFaveSpells();
        }
      });
      return;
    }

    this.getFaveSpells();
  }

  removeFromFaveSpells = spellId => {
    const userId = auth.currentUser.uid;
    database.ref(`users/${userId}/favorites/${spellId}`).remove();
  };

  getFaveSpells() {
    const userId = auth.currentUser.uid;
    database.ref(`users/${userId}/favorites`).on("value", snapshot => {
      if (!snapshot.val()) {
        this.setState({ favorites: [] });
        return;
      }

      const favorites = Object.values(snapshot.val());
      console.log("snapshot", snapshot.val(), "favorites", favorites);
      this.setState({ favorites });
    });
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading spells...</em>;
      case "LOADED":
        return (
          <div className="fave-spells">
            <br />
            <div className="btn-place" align="center">
              <Link to="/home" />
            </div>
            <br />
            <div className="scroll row">
              <p className="col-12" align="center">
                <br />
                <br />
                Here is a list of your favorite spells
              </p>

              <div id="people">
                <div id="dumb">
                  {this.state.favorites.map(spell => (
                    <div key={spell._id}>
                      {spell.spell}
                      <button
                        onClick={() => this.removeFromFaveSpells(spell._id)}
                      >
                        X
                      </button>
                    </div>
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
export default FavoritesList;
