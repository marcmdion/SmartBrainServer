const handleRegister = (req,res,db,bcrypt)=>{
	const {name, email, password} = req.body;

	if (!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	// bcrypt.hash(password, null, null, function(err, hash) {
	// 	console.log(hash);
 	//    // Store hash in your password DB.
	// }); 
	//async bcrypt, use  the sync method below

	const hash = bcrypt.hashSync(password);

	// database.users.push({
	// 	id: "125",
	// 	name: name, //name that we get
	// 	email: email, //email; that we get
	// 	// password: password, //password that we receive
	// 	//password disabled so that we wont receive the password
	// 	entries: 0, //since it is a new user
	// 	joined: new Date()
	// })
	//This will be replaced by our db below
	db.transaction(trx => { //use if you have 2 or more tb to update
		trx.insert({
			hash: hash,
			email: email 
		})
		.into('login') //first db table
		.returning('email')
		.then(loginEmail=>{
			return trx('users') //other db table
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				})
				.then(user => {
				res.json(user[0]);//to make sure that we are not returning an array
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		.catch(err => res.status(404).json('Unable to register!'));
		
}


module.exports={
	handleRegister:handleRegister
}