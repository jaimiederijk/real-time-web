import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Ships } from '../api/ships.js';

import Task from './Task.jsx';
import Ship from './Ship.jsx';

import ChooseShip from './ChooseShip.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {

  renderShips() {
    return this.props.ships.map((ship) => (
      <Ship key={ship._id} ship={ship} />
    ));
  }
  renderChooseShip() {
    if (this.props.ships.findOne({owner:Meteor.userId()})) {
      return <ChooseShip />
    };
  }
          // <input type="radio" name="hull" ref="hullType" value="Schooner" checked/> Schooner
          // <input type="radio" name="hull" ref="hullType" value="Brig"/> Brig
  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
          <h1>Choose your ship</h1>
        </header>
          {this.renderChooseShip()}
        <ul>
          {this.renderShips()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  ships: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    tasks:Tasks.find({}).fetch(),
    ships:Ships.find({}).fetch()
  };
},App);