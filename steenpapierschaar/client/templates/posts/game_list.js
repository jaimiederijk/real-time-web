Template.gameList.helpers({
	game: function() {
 	return Game.find({}, {sort: {submitted: -1}});
 }
});