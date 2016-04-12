import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class ChooseShip extends Component {

	handleSubmit(e) {
	    e.preventDefault();
	    const shipName = ReactDOM.findDOMNode(this.refs.shipName).value.trim(); //get value remove whitespace
	    const hullType = ReactDOM.findDOMNode(this.refs.hullType).value.trim();

	    Meteor.call('Ships.insert', shipName,hullType);
  	}
	render() {
		return (
			<form className="chooseShip" onSubmit={this.handleSubmit.bind(this)} >
	          <input
	              type="text"
	              ref="shipName"
	              placeholder="H.M.S. RTW"
	            />
	            <select ref="hullType" defaultValue="Schooner">
	              <option value="Schooner">Schooner</option>
	              <option value="Brig">Brig</option>
	            </select>

	          <input type="submit" value="Submit"/>
	        </form>
		);
	}
}