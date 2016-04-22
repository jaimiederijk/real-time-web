import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ships = new Mongo.Collection('ships');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('ships', function tasksPublication() {
    return Ships.find();
  });
}

Meteor.methods({
  'Ships.insert'(shipName,hullType) {
    check(shipName, String);
    check(hullType, String);

    // Meteor.users.update(Meteor.userId(), {$set: {profile: {"ship":"fun"}}});
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    var xStart = Math.floor(Math.random()*500);
    var yStart = Math.floor(Math.random()*500);
    var startPos = {"x":xStart,"y":yStart};

    var result = Ships.insert({
      "shipname": shipName,
      "hulltype": hullType,
      "position":startPos,
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
  'Ships.move' (shipId,x,y) {
    check(shipId, String);
    check(x,Number);
    check(y,Number);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    var ship = Ships.findOne({'_id':shipId});
    var oldX = ship.position.x;
    var oldY = ship.position.y;
    var newX = oldX + x;
    var newY = oldY + y;
    var newPos = {"x" : newX,"y":newY};

    Ships.update(shipId, {$set: {"position":newPos}});
  }
});