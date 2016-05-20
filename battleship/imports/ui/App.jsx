import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';


import { Weather } from '../api/weather.js';

import LocalWeather from './Weather.jsx';
import Card from './DragSource.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';



// App component - represents the whole app
@DragDropContext(HTML5Backend)
class App extends Component {


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
        
          <section>
            {this.renderWeather()}
            <Card text='Write the docs'/>

          </section>
      </div>
    );
  }
}


App.propTypes = {
  weather: PropTypes.array.isRequired,
  //game: PropTypes.array.isRequired
};

export default createContainer(() => {

  Meteor.subscribe('weather');
  //Meteor.subscribe('game');
  return {
    weather:Weather.find({}).fetch(),
    //game:Game.find({}).fetch(),
    currentUser: Meteor.user()
  };
},App);