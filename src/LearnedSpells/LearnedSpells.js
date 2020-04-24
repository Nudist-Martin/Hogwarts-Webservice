import React, { Component } from "react";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./LearnedSpells.css";
import modelInstance from "../data/MagicModel";
import firebase from "firebase";

class LearnedSpells extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      spellIndex: 0,
      offset: 1,
      message: ["test"]
    };
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDctErSNqeka-L9dZ7hUWbq_ify9kUKg9U",
      authDomain: "hogwarts-study-tool.firebaseapp.com",
      databaseURL: "https://hogwarts-study-tool.firebaseio.com",
      projectId: "hogwarts-study-tool",
      storageBucket: "hogwarts-study-tool.appspot.com",
      messagingSenderId: "755168622286"
    };
    firebase.initializeApp(config);
    console.log(firebase);
  }

  nextPage = () => {
    this.setState({
      spellIndex: this.state.spellIndex + 1,
      offset: this.state.offset + 1
    });
    this.getSpell();
  };

  previousPage = () => {
    this.setState({
      spellIndex: this.state.spellIndex - 1,
      offset: this.state.offset - 1
    });
    this.getSpell();
  };

  getSpell = () => {
    modelInstance
      .fetchData("spells")
      .then(spell => {
        /* If statement to not get get blank pages if you go to far*/
        if (this.state.spellIndex > 150) {
          this.setState({
            status: "LOADED",
            spellIndex: 150,
            offset: 151,
            spell: spell.slice(150, 151)
          });
        }
        if (this.state.spellIndex < 0) {
          this.setState({
            status: "LOADED",
            spellIndex: 0,
            offset: 1,
            spell: spell.slice(0, 1)
          });
        } else {
          this.setState({
            status: "LOADED",
            spell: spell.slice(this.state.spellIndex, this.state.offset)
          });
        }
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  componentDidMount() {
    this.getSpell();
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = firebase
      .database()
      .ref("messages")
      .orderByKey()
      .limitToLast(100);
    messagesRef.on("child_added", snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    firebase
      .database()
      .ref("messages")
      .push(this.inputEl.value);
    this.inputEl.value = ""; // <- clear the input
    alert("Saved");
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return <em>Loading spells...</em>;
      case "LOADED":
        return (
          <div>
            <Link to="/home">
              <button
                type="button"
                className="btn btn-outline-light"
                id="homeButton"
              >
                Homepage
              </button>
            </Link>
            <Link to="/Spells">
              <button
                type="button"
                className="btn btn-outline-light"
                id="AllSpellsButton"
              >
                All spells
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
                  <div className="content">
                    {this.state.spell.map(spell => (
                      <div className="type header" key={spell._id}>
                        Type: {spell.type}
                      </div>
                    ))}
                    {this.state.spell.map(spell => (
                      <div className="effect header" key={spell._id}>
                        Effect: {spell.effect}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rightPage">
                  <div className="header">
                    Enter your notes about this spell:
                  </div>
                  <form onSubmit={this.addMessage.bind(this)}>
                    <textarea
                      placeholder="Press here to start adding your note"
                      ref={el => (this.inputEl = el)}
                    />
                    <input
                      className="btn btn-outline-dark saveButton"
                      type="submit"
                    />
                  </form>
                </div>
              </div>
              <button
                id="bookButton"
                type="button"
                className="btn btn-outline-light"
                onClick={this.previousPage}
              >
                Previous spell
              </button>
              <button
                id="bookButton"
                type="button"
                className="btn btn-outline-light"
                onClick={this.nextPage}
              >
                Next spell
              </button>
            </div>
          </div>
        );

      default:
        return <b>Failed to load data, please try again</b>;
    }
  }
}
export default LearnedSpells;
