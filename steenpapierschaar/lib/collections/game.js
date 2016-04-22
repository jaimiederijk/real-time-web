Game= new Mongo.Collection("game");

validatePost = function (post) {
	var errors = {};
	if (!post.title){
		errors.title = "Please fill in a headline";
	}
		
	if (!post.value){
		errors.value = "Please check Steen papier or schaar";
	}		
	return errors;
}
validateUpdate = function (post) {
	var errors = {};		
	if (!post.value2){
		errors.value2 = "Please check Steen papier or schaar";
	}		
	return errors;
}

Meteor.methods({
	gameInsert: function(gameAttributes) {
		check(this.userId, String);
		check(gameAttributes, {
			title: String,
			value: String
		});

		var errors = validatePost(gameAttributes);
		if (errors.title || errors.value)
		 	throw new Meteor.Error('invalid-title', "You must set a title and make a choice");

		var user = Meteor.user();
		var postGame = _.extend(gameAttributes, {
		 	value2:"",
		 	challengerId:"",
		 	challenger:"",
		 	challengeSubmitted:"",
		 	userId: user._id,
		 	author: user.username,
		 	submitted: new Date()

		});
		var postId = Game.insert(postGame);
		return {
			_id: postId
		};
	},
	gameUpdaten: function(updateAttributes,gameId){
		check(this.userId, String);
		check(gameId, String);
		check(updateAttributes, { value2: String});		

		var errors = validateUpdate(updateAttributes);
		if (errors.value2){
		 	throw new Meteor.Error('invalid-choice', "You must make a choice");
		}
		var user = Meteor.user();
		var updateGame = _.extend(updateAttributes, {
		 	challengerId: user._id,
		 	challenger: user.username,
		 	challengeSubmitted: new Date()

		});
		var postId = Game.update(gameId,{$set:updateGame});
		return {
			_id: postId
		};
	}
});