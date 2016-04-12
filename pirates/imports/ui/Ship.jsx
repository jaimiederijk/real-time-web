import React, { Component, PropTypes } from 'react';

export default class Ship extends Component {
  render() {
    return (
      <div>
      	<h2>{this.props.ship.shipname}</h2>
      	<p>Shiptype: {this.props.ship.hulltype}</p>

      </div>
    );
  }
}

Ship.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  ship: PropTypes.object.isRequired,
};