const request = require("request");


//Write another function here to post the media using the container
const containerCall = ({id} ,user_id , access_token)=>{
	let URL  = `https://graph.facebook.com/v13.0/${user_id}/media_publish?creation_id=${id}&access_token=${access_token}`;
	request.post(URL ,(err ,body , res)=>{
		let response = JSON.parse(res);
		if(response.id){
			//Write a function here to update the database to store the media id;
			console.log("Image Posted successfully ! " , response);
		}else{
			console.log("Something went wrong " , body);
		}
	})
}




const apiCall = ({_id ,user_id	  , media_url ,isCarouesel ,caption , location_id ,tags ,access_token })=>{
	if(isCarouesel){
		var URL = `https://graph.facebook.com/v13.0/${user_id}/media?\
		&image_url=${media_url}\
		&caption=${caption}\
		&access_token=${access_token}\
		&is_carousel_item=${isCarouesel}`;
	}else{
	var URL = `https://graph.facebook.com/v13.0/${user_id}/media?\
	&image_url=${media_url}\
	&caption=${caption}\
	&access_token=${access_token}`;		
	}

	console.log(URL)	
	request.post(URL,(err , body , res)=>{
			var response = JSON.parse(res);
			if(response.id){
				console.log("Container Generated ID: " ,response.id);
				containerCall(response , user_id,  access_token);
			}else{
				console.log("Error Occures ",response);
			}
		}
	)
}


module.exports = {
	api  : apiCall
}