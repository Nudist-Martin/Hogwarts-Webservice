import React, { Component } from "react";
import modelInstance from "../data/MagicModel";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Spells.css";
import { auth, database } from "../firebase";

class Spells extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      spellIndex: 0,
      offset: 56,
      favorites: [],
      spell: []
    };
  }

  nextPage = () => {
    this.setState({
      spellIndex: this.state.spellIndex + 56,
      offset: this.state.offset + 56
    });
    this.getSpell();
  };

  previousPage = () => {
    this.setState({
      spellIndex: this.state.spellIndex - 56,
      offset: this.state.offset - 56
    });
    this.getSpell();
  };

  getSpell = () => {
    modelInstance
      .fetchData("spells")
      .then(spell => {
        console.log(spell);
        /* If statement to not get get blank pages if you go to far*/
        if (this.state.spellIndex > 112) {
          this.setState({
            status: "LOADED",
            spellIndex: 112,
            offset: 168,
            spell: spell.slice(112, 168)
          });
        }
        if (this.state.spellIndex < 0) {
          this.setState({
            status: "LOADED",
            spellIndex: 0,
            offset: 56,
            spell: spell.slice(0, 56)
          });
        } else {
          this.setState({
            status: "LOADED",
            spell: spell.slice(this.state.spellIndex, this.state.offset)
          });
        }
      })
      .catch(() => {
        console.log("error");
        this.setState({
          status: "ERROR"
        });
      });
  };

  displaySpells() {
    var spellList = [];
    var indexList = [];

    for (var x in this.state.spell) {
      if (this.state.favorites.length != 0) {
        for (var y in this.state.favorites) {
          if (this.state.spell[x]._id === this.state.favorites[y]._id) {
            indexList.push(x);
            console.log(indexList);
          }
        }
      }
      spellList.push(
        <div className="spells" key={this.state.spell[x]._id}>
          <Link
            className="spells"
            to={"/SpellDetail/" + this.state.spell[x]._id}
          >
            {this.state.spell[x].spell}
          </Link>
        </div>
      );
      console.log(spellList);

      if (indexList.length != 0) {
        for (var z in indexList) {
          spellList[indexList[z]] = (
            <div className="spells" key={this.state.spell[indexList[z]]._id}>
              <Link
                className="spells"
                to={"/SpellDetail/" + this.state.spell[indexList[z]]._id}
              >
                <img
                  id="favMark"
                  src="http://pngimg.com/uploads/star/star_PNG41518.png"
                  alt="favourite"
                  height="20px"
                  width="20px"
                />
                {this.state.spell[indexList[z]].spell}
              </Link>
            </div>
          );
        }
      }
    }
    return spellList;
  }

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

  componentDidMount() {
    if (!auth.currentUser) {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.getSpell();
          this.getFaveSpells();
        }
      });
      return;
    }
    this.getSpell();
    this.getFaveSpells();
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading spells...</em>;
      case "LOADED":
        return (
          <div>
            <div className="position" align="center">
              <h3>Click a spell for more details</h3>
            </div>
            <Link to="/home">
              <button
                type="button"
                className="btn btn-outline-light"
                id="homeButton"
              >
                Homepage
              </button>
            </Link>
            <Link to="/favouriteSpells">
              <button
                type="button"
                className="btn btn-outline-light"
                id="faveSpellsButton10"
              >
                Favourite spells
              </button>
            </Link>
            <div className="page">
              <div className="book">{this.displaySpells()}</div>
              <button
                id="bookButton"
                type="button"
                className="btn btn-outline-light"
                onClick={this.previousPage}
              >
                Previous page
              </button>
              <button
                id="bookButton"
                type="button"
                className="btn btn-outline-light"
                onClick={this.nextPage}
              >
                Next page
              </button>
            </div>
          </div>
        );

      default:
        return <b>Failed to load data, please try again</b>;
    }
  }
}
export default Spells;
