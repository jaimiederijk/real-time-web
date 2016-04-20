import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Weather = new Mongo.Collection('weather');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('weather', function tasksPublication() {
    return Weather.find();
  });
  if (Weather.find().count()<=0) {

  }
	 Meteor.methods({
	    "checkWeather"() {
	        this.unblock();
	        Meteor.http.call("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric",function(err,res) {
	
	        	Meteor.call('weather.insert',JSON.parse(res.content));
	        });
	    },
	    "weather.insert"(data) {
	    	Weather.insert (data);
	    }
	});
}


