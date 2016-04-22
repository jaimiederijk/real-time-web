Router.configure({
  	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	waitOn: function() { return Meteor.subscribe('game'); }
});


Router.route('/', {name: 'gameList'});


Router.route('/gameSubmit', {name: 'gameSubmit'});
Router.route('/gameItem/:_id/gameUpdate', {name: 'gameUpdate',
	data: function() { return Game.findOne(this.params._id); }
});

var requireLogin = function() {
	if (! Meteor.user()) {
 		if (Meteor.loggingIn()) {
 			this.render(this.loadingTemplate);
 		} else {
 			this.render('accessDenied');
 		}
 	} else {
 		this.next();
 	}
}

Router.onBeforeAction(requireLogin, {only: 'gameSubmit'});
Router.onBeforeAction(requireLogin, {only: 'gameUpdate'});