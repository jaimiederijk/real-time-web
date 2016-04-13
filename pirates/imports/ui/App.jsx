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
  findUserShip () {

    for (var i = 0; i < this.props.ships.length; i++) {

      if (this.props.ships[i].owner==Meteor.user()._id) {

        return true
      };
    };
  }
  renderShips() {
    return this.props.ships.map((ship) => (
      <Ship key={ship._id} ship={ship} />
    ));
  }
  // renderChooseShip() {
  //   if (this.findUserShip()) {
  //     return {this.renderChooseShip()}
  //   };
  // }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />

        </header>

          {this.props.currentUser && !this.findUserShip() ?
            <div><h1>Choose your ship</h1>
            <ChooseShip /></div>
             :""
          }
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
    ships:Ships.find({}).fetch(),
    currentUser: Meteor.user()
  };
},App);