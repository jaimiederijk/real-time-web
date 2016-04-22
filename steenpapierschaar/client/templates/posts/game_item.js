Template.gameItem.helpers({

	valueTrue: function() {
 		return Game.findOne({ _id:this._id,value2: { $in: ["steen", "papier","schaar" ] } });
 	},
 	//_id:this._id,_id:this._id,_id:this._id,Game.findOne({value:"steen",value2:"schaar"})
 	result: function() {
 		if (Game.find({ 
 			$or: [ 
	 			{_id:this._id, value:"papier",value2:"steen" },
	 			{ _id:this._id,value:"steen",value2:"schaar" },
	 			{_id:this._id, value:"schaar",value2:"papier" } 
 			]} ).count()>0) {
 			return this.author+" wins"
 		}
 		else if (Game.find({ 
 			$or: [ 
	 			{_id:this._id, value2:"papier",value:"steen" },
	 			{ _id:this._id,value2:"steen",value:"schaar" },
	 			{_id:this._id, value2:"schaar",value:"papier" } 
 			]} ).count()>0) {
 			return this.challenger+" wins"
 		} else if (Game.find({ 
 			$or: [ 
	 			{_id:this._id, value2:"steen",value:"steen"},
	 			{ _id:this._id,value2:"papier",value:"papier"},
	 			{_id:this._id, value2:"schaar",value:"schaar"} 
 			]} ).count()>0) {
 			return "draw"
 		} else{

 		};
 	},
 	allowChallenge: function() {
 		if (this.userId != Meteor.userId()&& Meteor.user() && !Game.findOne({ _id:this._id,value2: { $in: ["steen", "papier","schaar" ] } })){
 			return true;
 		};
 	},

 	
});	
		//_id:this._id,value:"steen",value2:"schaar"})
 		// ({ $or: [ { "value":"papier","value2":"steen" },
 			// { "value":"steen","value2":"schaar" },{ "value":"schaar","value2":"papier" } ]} );