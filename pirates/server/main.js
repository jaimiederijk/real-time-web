import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';
import '../imports/api/ships.js';
import '../imports/api/weather.js';

Meteor.startup(() => {
  
  var weatherInterval = Meteor.setInterval(Meteor.call("checkWeather"), 600000);//every 10 min get update
});
