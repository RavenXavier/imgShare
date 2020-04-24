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
  	if ((this.createdById == undefined) || (this.createdById == Meteor.userId())){
      $("#deleteId").val(myId);
      $("#confirmModal").modal("show");
    }
    else {
      alert("You don't have permission to delete that.");
    }
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