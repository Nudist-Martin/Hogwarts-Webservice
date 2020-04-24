import React, { Component } from "react";
import modelInstance from "../data/MagicModel";
import { Link } from "react-router-dom";
import { database, auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.css";
import "./SpellDetail.css";

class SpellDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
    };
  }

  getSpell = id => {
    modelInstance
      .fetchData("spells")
      .then(spell => {
        var activeSpellIndex = spell.findIndex(spell => spell._id === id);
        var nextSpellIndex = activeSpellIndex + 1;
        var previousSpellIndex = activeSpellIndex - 1;
        this.setState({
          status: "LOADED",
          allspells: spell,
          spell: spell.slice(activeSpellIndex, nextSpellIndex),
          nextSpell: spell.slice(nextSpellIndex, nextSpellIndex + 1),
          previousSpell: spell.slice(previousSpellIndex, previousSpellIndex + 1)
        });
      })
      .catch(() => {
        console.log("error");
        this.setState({
          status: "ERROR"
        });
      });
  };

  // getSpell = id => {
  //   modelInstance
  //     .fetchDataID(id)
  //     .then(spell => {
  //       console.log(spell);
  //       this.setState({
  //         spell: spell,
  //         status: "LOADED"
  //       });
  //     })
  //     .catch(() => {
  //       this.setState({
  //         status: "ERROR"
  //       });
  //     });
  // };

  addToFaveSpells = () => {
    const spell = this.state.spell[0];
    const userId = auth.currentUser.uid;
    database
      .ref(`users/${userId}/favorites/${spell._id}`)
      .set(spell)
      .then(() => {
        alert("Added spell", spell);
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    this.getSpell(this.props.match.params.spellId);
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading spells...</em>;
      case "LOADED":
        return (
          <div>
            <Link to="/home">
              <button type="button" className="btn btn-light" id="homeButton">
                Homepage
              </button>
            </Link>
            <Link to="/Spells">
              <button
                type="button"
                className="btn btn-light"
                id="AllSpellsButton"
              >
                Back to All Spells
              </button>
            </Link>
            <Link to="/favouriteSpells">
              <button
                type="button"
                className="btn btn-light"
                id="faveSpellsButton"
              >
                View Favourited Spells
              </button>
            </Link>
            <div className="page">
              <div className="book">
                <div className="leftPage">
                  {this.state.spell.map(spell => (
                    <div className="spell" key={spell._id}>
                      {spell.spell}
                    </div>
                  ))}
                  {this.state.spell.map(spell => (
                    <div className="type header content" key={spell._id}>
                      Type: {spell.type}
                    </div>
                  ))}
                  {this.state.spell.map(spell => (
                    <div className="effect header content" key={spell._id}>
                      Effect: {spell.effect}
                    </div>
                  ))}
                </div>
                <div className="rightPage">
                  <div className="header">
                    Press the button below to add this spell to your list of
                    favourite spells!
                  </div>
                  <button
                    id="addSpellButton"
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.addToFaveSpells()}
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                id="bookButton"
                type="button"
                className="btn btn-light"
                onClick={() => this.componentDidMount()}
              >
                {this.state.previousSpell.map(previousSpell => (
                  <div key={previousSpell._id}>
                    <Link to={"/SpellDetail/" + previousSpell._id}>
                      Previous spell
                    </Link>
                  </div>
                ))}
              </button>

              <button
                id="bookButton"
                type="button"
                className="btn btn-light"
                onClick={() => this.componentDidMount()}
              >
                {this.state.nextSpell.map(nextSpell => (
                  <div key={nextSpell._id}>
                    <Link to={"/SpellDetail/" + nextSpell._id}>Next spell</Link>
                  </div>
                ))}
              </button>
            </div>
          </div>
        );

      default:
        return <b>Failed to load data, please try again</b>;
    }
  }
}
export default SpellDetail;
