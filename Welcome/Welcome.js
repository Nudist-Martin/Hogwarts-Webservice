import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Welcome.css";
import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../firebase";

class Welcome extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/search")
      }
    })
  }

  onSignUp = (event) => {
    event.preventDefault();
    const form = event.target.elements
    const email = form[0].value
    const password = form[1].value
    auth.createUserWithEmailAndPassword(email, password).catch(error => {
      alert(error)
    })
  }

  onSignIn = (event) => {
    event.preventDefault();
    const form = event.target.elements
    const email = form[0].value
    const password = form[1].value
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      alert(error)
    })
  }


  render() {
    return (
      <div className="Welcome" align="center">
      <br /> <br /> <br />
        <h1>Welcome Hogwarts School for Witchcraft and Wizardry!</h1>
        <p>This nice piece of muggle technology lets you browse the spells you will be learning.
          <br /> You can also use it to get familiar with other students, past and present. </p>
      <br /> <br /> <br /> <br />

    <h3>Please enter your email and password in the boxes below, young witch/wizard:</h3>
  <br />
    <h3>Sign Up</h3>
    <form onSubmit={this.onSignUp}>
      <input type="email" placeholder="Enter email"/><input type="password" placeholder="Enter password"/>
      <button className="btn btn-outline-light">Sign Up</button>
      </form>
      <br />
      
    <h3>Sign In</h3>
    <form onSubmit={this.onSignIn}>
    <input type="email" placeholder="Enter email"/><input type="password" placeholder="Enter password"/>
      <button className="btn btn-outline-light">Sign In</button>
      </form>

      </div>

    );
  }
}

export default withRouter(Welcome);
