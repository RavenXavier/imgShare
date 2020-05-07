import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

BlazeLayout.setRoot('.container');

FlowRouter.route('/', {
  name: 'index',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {header:"banner", mainBody:"randomImg"});
    console.log("Home Page");
  }
});

FlowRouter.route('/gallery', {
  name: 'gallery',
  action(params, queryParams) {
  	BlazeLayout.render("pageLayout", {header: "banner", mainBody: "myGallery"});
    console.log("the gallery of picturea");
  }
});