Meteor.publish('game', function() {
 return Game.find();
});