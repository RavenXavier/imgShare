import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../imports/ui/layout.js';

Meteor.subscribe('imgGallery');

Tracker.autorun(function(){
	if (!Meteor.userId())
		if (Session.get("loggedIn")){
			Session.set("redirectAfterLogin", FlowRouter.current().path());
			FlowRouter.go(FlowRouter.path("login"));
			}
});



