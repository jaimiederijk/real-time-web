import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class MovementUI extends React.Component {
	  //http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
	_bind(...methods) {
		methods.forEach( (method) => this[method] = this[method].bind(this) );
	}
	constructor() {
	  super();
	  this._bind('handleClickLeft', 'handleClickDown','handleClickUp','handleClickRight','handleClickOut');
	  this.state = {left:false,right:false,up:false,down:false}
	}
	componentDidUpdate(nextProps,nextState) {
		//debugger
		if (nextState.left) {
			this.moveShip("l")
		};
		if (nextState.right) {
			this.moveShip("r")
		};
		if (nextState.up) {
			this.moveShip("u")
		};
		if (nextState.down) {
			this.moveShip("d")
		};
	}
	moveShip(direction) {
		var timeOut = Meteor.setTimeout(callMove,500)
		var shipId = Meteor.user().profile.shipId;
		function callMove() {
			// Meteor.call("Ships.move",shipId,10,10);
			Meteor.clearTimeout(timeOut);
		}
		
	}
	handleClickLeft(e)  { 
		this.setState({left: true});
	}
	handleClickRight(e) { 
		this.setState({right: true});
	}
	handleClickUp(e) { 
		this.setState({up: true});
	}
	handleClickDown(e) { 
		this.setState({down: true});
	}
	handleClickOut() {
		this.setState( {left:false,right:false,up:false,down:false});
	}
	// handleKeyPress(e) {
	// 	console.log(e.charCode )
	// 	if (e.charCode  == 13) {
 //        alert("enter");
 //      }
	// }
	render() {
		return (
			<div>
				<img src="/images/arrowkey.svg" onMouseDown ={this.handleClickLeft} onMouseUp={this.handleClickOut} />
				<img src="/images/arrowkey.svg" onMouseDown ={this.handleClickDown} onMouseUp={this.handleClickOut}/>
				<img src="/images/arrowkey.svg" onMouseDown ={this.handleClickUp} onMouseUp={this.handleClickOut}/>
				<img src="/images/arrowkey.svg" onMouseDown ={this.handleClickRight} onMouseUp={this.handleClickOut}/>
			</div>
		);
	}
}