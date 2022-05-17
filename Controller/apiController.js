//Import all the features here 
const DB = require("../db").db;
const data  = require("../Features/Datahandler").data;
const publishQuene = require("../Features/Quene").quene;
const api = require("../Features/instaApi").api;
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

var count = 0 ;

const getMilliSeconds = (date)=>{
	const newDate = dayjs(date);
	const cDate = dayjs(new Date()).tz("Asia/Kolkata");
	console.log("Current time  ", cDate.format());
	const diff = newDate.diff(cDate);
	return diff;
}

const deleteDb = (queneId)=>{
	 DB.deleteOne({_id : queneId} , (err , results)=>{
		if(!err){
			return true;
		}else{
			return false;
		}
	})
}

const refreshQuene = ()=>{
	//Delete all data from the quene if any 
	if(publishQuene.size() > 0){
		data.delete();
	}
	//Fetch data from api and refresh the entry in quene 
	 DB.find({}).sort({date : 1}).exec((err , results)=>{
		if(results){
			data.add(results);			
			trigger();				//After adding all the request to quene add trigger the request 
		}else{
			console.log("No Request found to post");
		}
	})
}

//Start Code from  here
const triggerApi = ()=>{
	return new Promise((resolve  , reject)=>{
	  if(publishQuene.size() <=0){
	  	reject(new Error("Qune is empty"));
	  }			
  	  var queneData = publishQuene.denque();
  	  const timeout = getMilliSeconds(new Date(queneData.date));
	  console.log(`trigger in  ${count}: `, timeout);
  	  setTimeout(()=>{

  	  	/*-----API CALL HERE----------*/
  	  	api(queneData);		

  	  	if(deleteDb(queneData._id)){
  	  		reject(new Error("Error While deleting the data"));
  	  	}else{
  	  		count ++ ;
			resolve(trigger);					//Problem resolved
  	  	}
  	  },timeout);
	})
}


const trigger = ()=>{
	triggerApi().finally(e=>{
				console.log("Request processed");
			}).then(resolve=>{
				resolve();
			}).catch(reject=>{
				console.log("Error Occurred   " , reject);
				return;
			})
}

const post = (req , res)=>{
	//get all the queries
		const info = new DB({
		user_id       : req.query.ig_id,
		media_url     : req.query.url,
		isCarouesel   : req.query.carousel,
		caption       : req.query.caption,
		location_id   : req.query.location,
		tags 		  : req.query.tags,
		access_token  : req.query.access_token,		
		date 	      : req.query.date,
		status        :200
	});

	info.save(err=>{
		if(!err){
			console.log("Data saved " , info);
			res.json(info);
			refreshQuene();
		}else{
			console.log(err);
			res.json({err:  "Error Occcured While sending the data ", status : 400});
		}
	})
}


module.exports = {
	post : post
}