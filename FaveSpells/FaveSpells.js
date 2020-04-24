import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./FaveSpells.css";
import { auth, database } from "../firebase";
import { Link } from "react-router-dom";

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
    return (
      <div className="fave-spells">
        <Link to="/home">
          <button type="button" className="btn btn-light" id="homeButton">
            Homepage
          </button>
        </Link>
        <Link to="/Spells">
          <button type="button" className="btn btn-light" id="AllSpellsButton">
            Back to All Spells
          </button>
        </Link>

        <div className="page">
          <div className="book">
            <h1 id="headline">All your favourite spells</h1>
            {this.state.favorites.map(spell => (
              <div key={spell._id}>
                <button
                  className="remove"
                  onClick={() => this.removeFromFaveSpells(spell._id)}
                >
                  Remove
                </button>
                <Link className="favText" to={"/SpellDetail/" + spell._id}>
                  {spell.spell}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FavoritesList;
