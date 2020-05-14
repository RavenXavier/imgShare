import { Random } from 'meteor/random';

	uniqueNumber = function(){
		var n = Math.floor(Random.fraction()*imagesdb.find().count());
		return n;
	}

Template.randomImg.helpers({
	randImg(){
		console.log(uniqueNumber());
		return imagesdb.find().fetch()[uniqueNumber()];
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