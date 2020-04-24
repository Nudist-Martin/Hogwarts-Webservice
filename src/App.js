import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/MagicModel";
import Sorting from "./Sorting/Sorting";
import Sorted from "./Sorted/Sorted";
import Spells from "./Spells/Spells";
import Home from "./Home/Home";
import OtherPeople from "./OtherPeople/otherPeople";
import DeathEaters from "./OtherPeople/deathEaters";
import MinistryEmployees from "./OtherPeople/ministryEmployees";
import SpellDetail from "./SpellDetail/SpellDetail";
import "./App.css";
import FaveSpells from "./FaveSpells/FaveSpells";
import Characters from "./Characters/Characters";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" align="center">
            {this.state.title}
          </h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />

          <Route
            path="/search"
            render={() => <Sorting model={modelInstance} />}
          />

          <Route path="/sorted/:house" component={Sorted} />

          <Route path="/spellDetail/:spellId" component={SpellDetail} />

          <Route path="/deatheaters" component={DeathEaters} />

          <Route
            path="/spells"
            render={() => <Spells model={modelInstance} />}
          />

          <Route path="/home" render={() => <Home model={modelInstance} />} />

          <Route
            path="/otherPeople"
            render={() => <OtherPeople model={modelInstance} />}
          />

          <Route
            path="/ministryEmployees"
            render={() => <MinistryEmployees model={modelInstance} />}
          />

          <Route
            path="/favouritespells"
            render={() => <FaveSpells model={modelInstance} />}
          />

          <Route path="/people/:house" component={Characters} />
        </header>
      </div>
    );
  }
}

export default App;
