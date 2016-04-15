import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ships = new Mongo.Collection('ships');

Meteor.methods({
  'Ships.insert'(shipName,hullType) {
    check(shipName, String);
    check(hullType, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    var xStart = Math.floor(Math.random()*500);
    var yStart = Math.floor(Math.random()*500);
    var startPos = {"x":xStart,"y":yStart};

    Ships.insert({
      "shipname": shipName,
      "hulltype": hullType,
      "position":startPos,
      "createdAt": new Date(),
      "owner": Meteor.userId(),
      "username": Meteor.user().username,
    });
  },
  'Ships.remove'(taskId) {
    check(Ships, String);

    Tasks.remove(taskId);
  }
});