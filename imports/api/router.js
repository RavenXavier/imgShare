import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

BlazeLayout.setRoot('.container');

Accounts.onLogin(function(){
	const redirect = Session.get("redirectAfterLogin");
	if (redirect){
		FlowRouter.go(redirect);
	}
	Meteor.logoutOtherClients();
	Session.set("loggedIn", true);
});

Accounts.onLogout(function(){
	if (FlowRouter._current.route.name != "login")
	Session.set("redirectAfterLogin",FlowRouter._current.path);
	FlowRouter.go("index");
});

const normal = FlowRouter.group();

const loggedIn = FlowRouter.group({
	triggersEnter:[
		function(context, redirect) {
			if (!Meteor.userId()){
				if  (context.route.name != "login")
					Session.set("redirectAfterLogin", context.path);
				redirect("login");
			}
		}
	]
});

normal.route('/', {
  name: 'index',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {header:"banner", mainBody:"randomImg"});
  }
});

normal.route('/login', {
  name: 'index',
  action() {
  	BlazeLayout.render("pageLayout", {header:"banner", mainBody: "login"});
  }
});

loggedIn.route('/logout', {
  name: 'logout',
  action(params, queryParams) {
  	Meteor.logout(FlowRouter.go("login"));
  }
});

loggedIn.route('/gallery', {
  name: 'gallery',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {header: "banner", mainBody: "myGallery"});
  }
});

loggedIn.route('/gallery/:_id', {
	name: 'viewImg',
	action(params){
		BlazeLayout.render("pageLayout", {header:"banner", mainBody: "viewImage"});
	}
});
normal.route('/about', {
	name: 'aboutUs',
	action(){
		BlazeLayout.render("pageLayout", {header:"banner", mainBody: "about"});
	}
});

FlowRouter.route('*',{
	name: 'error404',
	action(){
		BlazeLayout.render("pageLayout", {mainBody: "error404"});
	}
});

