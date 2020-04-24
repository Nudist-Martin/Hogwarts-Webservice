import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Start.css";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.css";

class Start extends Component {
    constructor(props) {
      super(props);
      this.state = {
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
    return (
      <div className="Start" align="center">
      <br /> <br /> <br />
        <div className="intro">
          <h1>Please enter your name in the box below, young witch/wizard:</h1>
        </div>
        <br />
          <form onSubmit={this.addMessage.bind(this)}>
            <textarea
              id="nameSpace"
              placeholder="Enter Name"
              ref={el => (this.inputEl = el)}
            />
            <Link to="/welcome">
              <input
                className="btn btn-outline-light saveButton"
                type="submit"
            />
            </Link>
            </form>
        <br/> <br />
      </div>
    );
  }
}

export default Start;
