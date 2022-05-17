//Handles all the database Schema and creation of database 
const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
	user_id : String,
	media_url : String,
	caption  : String,
	access_token  : String,
	ms 		: Number,
	date   	: Date, 		//Date to be executed on,
	media_id : String,
	container_id : String
})

const db = new mongoose.model("Insta_API" , dbSchema);
const successDb = new mongoose.model("Published_data", dbSchema);

module.exports = {
	db  : db,
	sDb : successDb
}