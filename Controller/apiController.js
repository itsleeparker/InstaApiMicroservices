//Import all the features here 
const DB = require("../db").db;
const deleteDb = require("../Features/dbFunctions").delete;
const data  = require("../Features/Datahandler").data;
const publishQuene = require("../Features/Quene").quene;
const api = require("../Features/instaApi").api;
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

var count = 0 ;

/*----------IMPORTANT FUNCTIONS DO NOT TOUCH------------------*/
/*------MILLISECONDS CONVERTER FUNCTION HERE-----------*/

const getMilliSeconds = (date)=>{
	/*---ONLY TOUCH IF SWITCHING FROM SERVER TO LOCAL----*/
	const cDate = dayjs(new Date()).tz("Asia/Kolkata");
  	var newDate =   dayjs(date+" UTC ");			//Change this line of code when working on local		
	/*---ONLY TOUCH IF SWITCHING FROM SERVER TO LOCAL----*/
	console.log("Current time  ", cDate.format());
	console.log("Given Time    " , newDate.format());
	const diff = newDate.diff(cDate);
	return diff;
}


/*------------REFERSH QUENE FNCTIONS-----------------*/
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


/*------------TRIGGER PROMISE FUNCTION HERE-------------*/
const triggerApi = ()=>{
	return new Promise((resolve  , reject)=>{
	  if(publishQuene.size() <=0){
	  	reject(new Error("Qune is empty"));
	  }			
  	  var queneData = publishQuene.denque();
  	  const timeout = getMilliSeconds(queneData.date);
	  console.log(`trigger in  ${count}: `, timeout);
  	  setTimeout(()=>{

  	  	/*-----API CALL HERE----------*/
  	  	api(queneData , queneData);		

  	  	if(deleteDb(queneData._id)){
  	  		reject(new Error("Error While deleting the data"));
  	  	}else{
  	  		count ++ ;
			resolve(trigger);					//Problem resolved
  	  	}
  	  },timeout);
	})
}

/*------------------IMPORTANT------------------*/

/*-------------TRIGGER FUCTION HERE-------------*/

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
			refreshQuene();		//Update the quene 
		}else{
			console.log(err);
			res.json({err:  "Error Occcured While sending the data ", status : 400 , des : err});
		}
	})
}


module.exports = {
	post : post
}