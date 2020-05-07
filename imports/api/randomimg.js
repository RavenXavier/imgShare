import { Random } from 'meteor/random';

// Meteor.methods({
// 	uniqueNumber(){
// 		var n;
// 		n = Math.floor(Random.fraction(*imagesdb.find().count()));
// 		console.log("random: " + n);
// 		return n;
// 	}
// })
Template.randomImg.helpers({
	randImg(){
		return imagesdb.findOne();
	}
});