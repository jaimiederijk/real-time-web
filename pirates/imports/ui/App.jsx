import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Ships } from '../api/ships.js';
import { Weather } from '../api/weather.js';

import Ship from './Ship.jsx';
import LocalWeather from './Weather.jsx';

import ChooseShip from './ChooseShip.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  findUserShip () {
    if (Meteor.user().profile && Meteor.user().profile.shipId) {
      return true
    };
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
  renderWeather() {
    return this.props.weather.map(function(weather) {
      return  <LocalWeather key={weather._id} weather={weather} />
    });
  }
//<LocalWeather weather={this.props.weather} />
  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />

        </header>
        {this.props.currentUser ?
          <section>
            {this.renderWeather()}
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
  weather: PropTypes.array.isRequired,
  ships: PropTypes.array.isRequired
};

export default createContainer(() => {

  Meteor.subscribe('weather');
  Meteor.subscribe('ships');
  return {
    weather:Weather.find({}).fetch(),
    ships:Ships.find({}).fetch(),
    currentUser: Meteor.user()
  };
},App);