import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.viewImage.helpers({
	viewImg(){
		return imagesdb.findOne(FlowRouter.getParam("_id"));
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