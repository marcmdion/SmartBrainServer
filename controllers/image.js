const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '86aef2717afe4258a40232d7978eaac9'
});

const handleApiCall = (req,res) =>{
	app.models
	.predict(
      Clarifai.FACE_DETECT_MODEL, 
      req.body.input )
	.then(data => {res.json(data);
	})
	.catch(err=> res.status(400).json('unable to work with API'))
}



const handleImage = (req,res,db)=>{
const { id } = req.body;
// let found = false;
// database.users.forEach( user => {
// 	if (user.id === id){
// 		found = true;
// 		user.entries ++; 
// 		return res.json(user.entries); 
// 	} 
// 	})
// if (!found){
// 	res.status(400).json('User not found in the database!')
// }
//use below
db('users')
	.where('id', '=', id)
  	.increment('entries',1)
  	.returning('entries')
  	.then(entries => {
  	 res.json(entries[0])
  })
  	.catch(err => res.status(404).json('Unable to get entries!'))
}

module.exports = {
	handleImage:handleImage
}