const request = require("request");


//Write another function here to post the media using the container

const apiCall = ({user_id  ,media_url ,isCarouesel ,caption ,location_id ,tags ,access_token })=>{
	request.post(
		`https://graph.facebook.com/v13.0/${access_token}/media
		?image_url=${media_url}
		&is_carousel_item=${isCarouesel}
		&caption=${caption}
		&location_id=${location_id}
		&user_tags=${tags}
		&access_token=${access_token}`,

		(err , res , body)=>{
			if(!err){
				console.log("Response is : " ,res , body);			//Check for container id and write a function to post data 				
			}else{
				console.log('Error Occurred ' , err);
			}
		}
	)
}


module.exports = {
	api  : apiCall
}