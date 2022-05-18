const DB = require("../db").db;
const SDB = require("../db").sDb;
const deleteDb = (queneId)=>{
	 DB.deleteOne({_id : queneId } , (err , results)=>{
		if(!err){
			return true;
		}else{
			return false;
		}
	})
}



const updateDb = ({user_id , media_url , caption , access_token , media_id  , date , container_id})=>{
	var apiData = new SDB({
			user_id : user_id,
			media_url :media_url,
			caption  : caption,
			access_token  : access_token,
			date   	: date, 		
			media_id : media_id,
			container_id : container_id
	});
	apiData.save(err=>{
		if(!err){
			console.log("Data saved " , apiData);
		}else{
			console.log("Error Occurred while saving the data in success db : " , err);
		}
	})
}

module.exports = {
	delete : deleteDb,
	update : updateDb
}