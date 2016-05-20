import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Weather = new Mongo.Collection('weather');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('weather', function tasksPublication() {
    return Weather.find();
  });

	 Meteor.methods({
	    "checkWeather"() {
	        this.unblock();
	        Meteor.http.call("GET", "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=d55e532e359ca4e0b28bc4cf0ae34bce",function(err,res) {
				console.log("new data")
	        	Meteor.call('weather.insert',JSON.parse(res.content));
	        });
	    },
	    "weather.insert"(data) {
	    	if (Weather.find().count()<=0) {
				Weather.insert (data);
			} else {
				Weather.update({"name":"Amsterdam"},{
					$set:data
				});//{city.name: "Moscow"},{$set: data}
			}

	    	
	    }
	});
}


