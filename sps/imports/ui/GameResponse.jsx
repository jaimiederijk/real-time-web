import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';



export default class GameResponse extends Component {

	handleSubmit(e) {
	    e.preventDefault();

	    var gameId = this.props.game._id;
	    var choice = ReactDOM.findDOMNode(this.refs.choice).value.trim();

	    Meteor.call('Game.response', gameId,choice,function(err,res) {
	    	if (err) {
	    		console.log("no insert")
	    	} else {
	    		//Meteor.users.update(Meteor.userId(), {$set: {profile: {"shipId":res}}});
	    	}
	    });
			 //      Meteor.call("checkWeather", function(error, results) {
		  //     console.log(results); //results.data should be a JSON object
		  // });
  	}
	render() {
		return (
			<form className="GameResponse" onSubmit={this.handleSubmit.bind(this)} >
	          
	            <select ref="choice" defaultValue="Rock">
	              <option value="Rock">Rock</option>
	              <option value="Paper">Paper</option>
	              <option value="Scissors">Scissors</option>
	            </select>

	          <input type="submit" value="Submit"/>
	        </form>
		);
	}
}

GameResponse.propTypes = {
  game: PropTypes.object.isRequired,
};