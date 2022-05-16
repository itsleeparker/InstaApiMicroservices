//Responnsible for adding and deleting all the data to the quene

const publishQuene = require("./Quene").quene;

function dataHandler(){
	return {
		add :  (arr)=>{
			for(var i in arr){
				publishQuene.enque(arr[i]);
			}

		},
		delete : ()=>{
			while(!publishQuene.isEmpty()){
				publishQuene.denque();
			}
		}

	}	
}

const data = new dataHandler();

module.exports = {
	data : data
}