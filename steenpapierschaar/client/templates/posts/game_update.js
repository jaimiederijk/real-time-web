Template.gameUpdate.events({
	"submit .form": function (event) {
		event.preventDefault();
		var post = {
			value2:event.target.sps.value
		};	
		Meteor.call('gameUpdaten',post,this._id,function(error,result){
			if (error) {
				return alert(error.reason)
			} 	
		})	
		Router.go('gameList')	
	}
})