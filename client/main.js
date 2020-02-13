import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

// Template.picture.onCreated(function pictureOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

Template.myGallery.helpers({
	allImages() {
		return imagesdb.find();
	},
});

Template.myGallery.events({
  'click .js-delete'(event, instance) { 
  	// console.log("deleteing...");
  	// console.log(this._id);
  	var myId = this._id;
  	$("#"+this._id).fadeOut('slow',function(){
  	imagesdb.remove({_id:myId});
  	});
  
  },

});

Template.addImage.events({
	'click .js-addMe'(event, instance){
		console.log("adding image...");
	},
	'click .js-closeMe'(event, instance){
		console.log("closing...")
	}, 
	'click .js-saveMe'(event, instance){
		var myTitle = $("#imgTitle").val();
		var myPath = $("#imgPath").val();
		var myDesc = $("#imgDesc").val();
		// console.log("Saving Image with title: "+myTitle);
		imagesdb.insert({
			"title": myTitle,
			"path": myPath,
			"desc": myDesc
 		});
 		console.log("saving...");
 		$("#addimageModal").modal("hide");
	},


});