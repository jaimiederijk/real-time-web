import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';


export default class createGame extends Component {

	handleSubmit(e) {
	    e.preventDefault();

	    const gameName = ReactDOM.findDOMNode(this.refs.gameName).value.trim(); //get value remove whitespace
	    const creatorChoice = ReactDOM.findDOMNode(this.refs.creatorChoice).value.trim();
		if (gameName==""||creatorChoice=="") {
			    	return
		};
	    Meteor.call('Game.createGame', gameName,creatorChoice,function(err,res) {
	    	if (err) {
	    		console.log("no insert")
	    	} else {
	    		//Meteor.users.update(Meteor.userId(), {$set: {profile: {"shipId":res}}});
	    	}
	    });
			 // // //      Meteor.call("checkWeather", function(error, results) {<label for="Rock"><img src="/images/steen.png"/></label>
	   //          <input type="radio" ref="creatorChoice"  name="sps" value="Rock" id="Rock"/>Rock

	   //          <label for="Paper"><img src="/images/papier.png"/></label>
    //            <input type="radio" ref="creatorChoice"  name="sps" value="Paper" id="Paper"/>Paper

    //             <label for="Scissors"><img src="/images/schaar.png"/></label>
    //            <input type="radio" ref="creatorChoice"  name="sps" value="Scissors" id="Scissors"/>Scissors
		  //     console.log(results); //results.data should be a JSON object
		  // });
  	}
	render() {
		return (
			<form className="createGame" onSubmit={this.handleSubmit.bind(this)} >
	          <input
	              type="text"
	              ref="gameName"
	              placeholder="game name"
	            />
	            <select ref="creatorChoice" defaultValue="Rock">
	              <option value="Rock">Rock</option>
	              <option value="Paper">Paper</option>
	               <option value="Scissors">Scissors</option>
	            </select>
	            
	            

	          <input type="submit" value="Submit"/>
	        </form>
		);
	}
}