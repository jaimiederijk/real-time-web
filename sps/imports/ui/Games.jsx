import React, { Component, PropTypes } from 'react';
import GameResponse from './GameResponse.jsx';

export default class Games extends Component {
  renderResult () {
    if (this.props.game.result=="draw") {
      return <p>draw</p>

    } else if (this.props.game.result==Meteor.userId()) {
      return <p>You have won</p>

    } else if (this.props.game.result==this.props.game.owner) {
      return <p>The winner is: {this.props.game.username}</p>

    } else {
      return <p>The winner is: {this.props.game.otherPlayerName}</p>

    }
  }
  render() {
    return (
      <div>
      	<h3>{this.props.game.gameName}</h3>
        <span>Created by: {this.props.game.username}</span>
        {this.props.game.result ? 
          <section>
            {this.renderResult()}
          </section>
          : <section> 
              {Meteor.userId() != this.props.game.owner ?
              <GameResponse key={this.props.game._id} game={this.props.game} />
              : <p>yours</p>
              }
            </section>
        }
      	
      </div>
    );
  }
}

Games.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required<p><span>x:{this.props.ship.position.x}</span><span>y:{this.props.position.ship.y}</span></p>
  game: PropTypes.object.isRequired,
};