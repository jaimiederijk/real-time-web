Template.gameSubmit.events({
	"submit .form": function (event) {
		event.preventDefault();
		var post = {
		 	title: event.target.title.value,
		 	value: event.target.sps.value

 		};



		Meteor.call('gameInsert',post,function(error,result){
			if (error) {
				return alert(error.reason)
			}
			
		})
		Router.go("gameList")
		// var title = event.target.title.value;
		// var sps = event.target.sps.value;
//$(event.target).find('[name=sps]').val()
		// Game.insert({
		// 	title:title,
		// 	value:sps,
		// 	,
		// 	createdAt:new Date()
		// });


	}
})