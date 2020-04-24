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