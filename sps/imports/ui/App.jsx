import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Game } from '../api/game.js';
//import { Weather } from '../api/weather.js';


//import LocalWeather from './Weather.jsx';

import CreateGame from './CreateGame.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Games from './Games.jsx';

// App component - represents the whole app
class App extends Component {

  
  renderGames() {
    return this.props.game.map(function(game) {
      
        return  <Games key={game._id} game={game} />
      
    });
  }
  
  // renderWeather() {//{this.renderWeather()}
  //   return this.props.weather.map(function(weather) {
  //     return  <LocalWeather key={weather._id} weather={weather} />
  //   });
  // }
//<LocalWeather weather={this.props.weather} />
  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
          <img src="/images/steen.png"/>
          <img src="/images/papier.png"/>
          <img src="/images/schaar.png"/>
        </header>
        {this.props.currentUser ?
          <section>
            
            <section className="game_section">
                <section className="creategame">
                  <h2>Create Game</h2>
                  <CreateGame />
                  
                </section>

                  <section className="games_container">
                    {this.renderGames()}
                  </section>
            </section>

          </section> : ""}
      </div>
    );
  }
}

App.propTypes = {
  //weather: PropTypes.array.isRequired,
  game: PropTypes.array.isRequired
};

export default createContainer(() => {

  //Meteor.subscribe('weather');
  Meteor.subscribe('game');
  return {
    //weather:Weather.find({}).fetch(),
    game:Game.find({}).fetch(),
    currentUser: Meteor.user()
  };
},App);