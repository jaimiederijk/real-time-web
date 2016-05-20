import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Game = new Mongo.Collection('game');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('game', function tasksPublication() {
    return Game.find();
  });
}

Meteor.methods({
  'Game.createGame'(gameName,creatorChoice) {
    check(gameName, String);
    check(creatorChoice, String);

    // Meteor.users.update(Meteor.userId(), {$set: {profile: {"ship":"fun"}}});
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var result = Game.insert({
      "gameName": gameName,
      "creatorChoice": creatorChoice,
      "createdAt": new Date(),
      "owner": Meteor.userId(),
      "username": Meteor.user().username,
    });
    return result;
  },
  'Ships.remove'(taskId) {
    check(Ships, String);

    Ships.remove(taskId);
  },
  'Game.response' (gameId,choice) {
    check(gameId, String);
    check(choice,String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    var game = Game.findOne({'_id':gameId});
    var gameId = gameId;
    var choice = choice;
    var userId = Meteor.userId();
    var result;

    if (game.creatorChoice==choice) {
      result = "draw";
    } 
    else if (game.creatorChoice=="Rock") {
      if (choice=="paper") {
        result = userId;
      } else {
        result = Game.owner;
      }
    }
    else if (game.creatorChoice=="Paper") {
      if (choice=="Scissors") {
        result = userId;
      } else {
        result = Game.owner;
      }
    }
    else if (game.creatorChoice=="Scissors") {
      if (choice=="Rock") {
        result = userId;
      } else {
        result = Game.owner;
      }
    } else {
      console.log("sps logic error");
    }

    Game.update(gameId, {$set: {"result":result,"otherPlayer":userId,"otherPlayerName":Meteor.user().username}});
  }
});