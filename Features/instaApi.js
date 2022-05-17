const request = require("request");


//Write another function here to post the media using the container

const apiCall = ({user_id	  , media_url ,isCarouesel ,caption , location_id ,tags ,access_token })=>{
	var URL = `https://graph.facebook.com/v13.0/${user_id}/media?\
	&image_url=${media_url}\
	&caption=${caption}\
	&access_token=${access_token}`;
	
	console.log(URL);	
	request.post(URL,(err , body , res)=>{
			if(!err){
				console.log("Response is : " ,res);			//Check for container id and write a function to post data 				
			}else{
				console.log('Error Occurred ');
			}
		}
	)
}


module.exports = {
	api  : apiCall
}