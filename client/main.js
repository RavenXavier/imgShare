import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

import './main.html';
import '../lib/collection.js';

Meteor.subscribe('imgGallery');

import '../lib/accounts-ui.js';

Session.set("imageLimit", 9);
lastScrollTop = 0;

$(window).scroll(function(event){
	//check if we are near the bottom of the page 
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
		//where are we on the page
		var scrollTop = $(this).scrollTop();
		//test if we are going down
		if (scrollTop > lastScrollTop){
			//yes we are scrolling down
			Session.set("imageLimit",Session.get("imageLimit") + 3);
		}//end of if (new scrollTop)
		lastScrollTop = scrollTop;	
	}//end of (height check)
});	


Template.myGallery.helpers({
	allImages() {
		//get time 15 seconds
		var prevTime = new Date().getTime() - 15000;
		var results = imagesdb.find({createdOn: {$gte: prevTime}}).count();
		if (results > 0){
			return imagesdb.find({}, {sort:{createdOn: -1, ratings: -1}, limit: Session.get("imageLimit")});
		}
		else{
			return imagesdb.find({}, {sort:{ratings: -1, createdOn: -1}, limit: Session.get("imageLimit")});
		}
	},
	userField(){//ceck to see if image has a saved user
		if (!(this.createdBy == undefined)){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.myGallery.events({
  'click .js-delete'(event, instance) { 
  	// console.log("deleteing...");
  	// console.log(this._id);
  	var myId = this._id;
  	$('#deleteId').val(myId)
  	$('#confirmModal').modal('show')
  },
 'click .js-edit'(event, instance){
  $("#editimageModal").modal("show");
  	var myId = this._id;
  	var edTitle = imagesdb.findOne({_id:myId}).title;
  	var edPath = imagesdb.findOne({_id:myId}).path;
  	var edDesc = imagesdb.findOne({_id:myId}).desc;
  	$("#editId").val(myId);
  	$("#editTitle").val(edTitle);
  	$("#editPath").val(edPath);
  	$("#editDesc").val(edDesc);
  	$(".editHolder").attr("src", edPath);
 	},
 	'click .js-confirm'(event, instance){
 		var myId = $("#deleteId").val();
 		$("#"+myId).fadeOut('slow',function(){
  	imagesdb.remove({_id:myId});
  	});
 	},
 	"click .rating"(event) {
        const value = $(event.target).val();
        var myId = this.picId;
        console.log(myId + ":" + value);
        imagesdb.update({_id: myId},
				{$set:{
					"ratings":value
				}}
			);
    },
});

Template.addImage.events({
	'click .js-addMe'(event, instance){
		console.log("adding image...");
	},
	'click .js-closeMe'(event, instance){
		// console.log("closing...")
		var myTitle = $("#imgTitle").val("");
		var myPath = $("#imgPath").val("");
		var myDesc = $("#imgDesc").val("");
		$(".placeHolder").attr("src",$("#imgPath").val())
	}, 
	'click .js-saveMe'(event, instance){
		var myTitle = $("#imgTitle").val();
		var myPath = $("#imgPath").val();
		var myDesc = $("#imgDesc").val();
		imagesdb.insert({
			"title": myTitle,
			"path": myPath,
			"desc": myDesc,
			"createdOn":  new Date().getTime(),
			"createdBy": Meteor.users.findOne({_id:Meteor.userId()}).username,
 			"createdById": Meteor.userId()
 		});
 		console.log("saving...");
 		$("#addimageModal").modal("hide");
 		var myTitle = $("#imgTitle").val("");
		var myPath = $("#imgPath").val("");
		var myDesc = $("#imgDesc").val("");
	},
		'input #imgPath'(event, instance){
			$(".placeHolder").attr("src",$("#imgPath").val())
			console.log($("#imgPath").val());

		},
});

Template.editImage.events({
	'click .js-updateMe'(event, instance){
		var newTitle = $("#editTitle").val();
		var newPath = $("#editPath").val();
		var newDesc = $("#editDesc").val();
		var updateId = $("#editId").val();
		//console.log("id "+updateId+ "title "+newTitle+ "path "+newPath+ "decri "+newDesc);
		imagesdb.update({_id: updateId},
				{$set:{
					"title": newTitle,
					"path": newPath,
					"desc": newDesc
				}}
			);
		$("#editimageModal").modal("hide");
		},
		'input .editPath'(event, instance){
			$(".placeHolder").attr("src",$("#editPath").val())
			console.log($("#editPath").val());
		}	
});