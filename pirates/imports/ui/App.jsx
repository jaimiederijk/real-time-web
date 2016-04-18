import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Ships } from '../api/ships.js';
import { Weather } from '../api/weather.js';

import Task from './Task.jsx';
import Ship from './Ship.jsx';

import ChooseShip from './ChooseShip.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  findUserShip () {
    if (Meteor.user().profile && Meteor.user().profile.shipId) {
      return true
    };
    // for (var i = 0; i < this.props.ships.length; i++) {

    //   if (this.props.ships[i].owner==Meteor.user()._id) {

        
    //   };
    // };
  }
  renderShips() {
    return this.props.ships.map(function(ship) {
      if (Meteor.user().profile.shipId != ship._id) {
        return  <Ship key={ship._id} ship={ship} />
      };
    });
  }
  renderYourShip() {
    return this.props.ships.map(function(ship) {
      if (Meteor.user().profile.shipId == ship._id) {

        return  <Ship key={ship._id} ship={ship} />
      };
    });
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
        {this.props.currentUser ?
          <section>
            <section>
              {!this.findUserShip() ?
                <div>
                  <h1>Choose your ship</h1>
                  <ChooseShip />
                </div>
                :
                <section>
                  <h2>Your ship</h2>
                  {this.renderYourShip()}
                  <h2>Enemy ship</h2>
                  {this.renderShips()}
                </section>
              }
            </section>

          </section> : ""}
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  ships: PropTypes.array.isRequired
};

export default createContainer(() => {

  Meteor.subscribe('weather');
  Meteor.subscribe('ships');
  return {
    tasks:Tasks.find({}).fetch(),
    weather:Weather.find({}).fetch(),
    ships:Ships.find({}).fetch(),
    currentUser: Meteor.user()
  };
},App);