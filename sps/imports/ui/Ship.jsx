import React, { Component, PropTypes } from 'react';

export default class Games extends Component {
  render() {
    return (
      <div>
      	<h3>{this.props.game.gameName}</h3>
      	
      </div>
    );
  }
}

Games.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required<p><span>x:{this.props.ship.position.x}</span><span>y:{this.props.position.ship.y}</span></p>
  game: PropTypes.object.isRequired,
};