//Handles all the database Schema and creation of database 
const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
	user_id : String,
	media_url : String,
	isCarouesel : Boolean,
	caption  : String,
	location_id : String,
	tags 	: Array,
	access_token  : String,
	ms 		: Number,
	date   	: Date, 		//Date to be executed on,
	media_id : String
})

const db = new mongoose.model("Insta_API" , dbSchema);

module.exports = {
	db  : db
}