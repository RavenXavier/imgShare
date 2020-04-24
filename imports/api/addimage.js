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