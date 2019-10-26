const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile= require('./controllers/profile');
const image= require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'marcmdion',
    password : '',
    database : 'smart-brain'
  }
});

// check if db is working
// db .select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());
//middleware
//we should do this after the app variable has been created

// const database = {
// 	users:[
// 	{
// 		id: "123",
// 		name: "John",
// 		password: 'cookies',
// 		email: "john@gmail.com",
// 		entries: 0,
// 		joined: new Date()
// 	},
// 	{
// 		id: "124",
// 		name: "Sally",
// 		password:'bananas', 
// 		email: "sally@gmail.com",
// 		entries: 0,
// 		joined: new Date()
// 	}
// 	],
// 	login: [
// 	{
// 		id: '987',
// 		hash: '',
// 		email: 'john@gmail.com'
// 	}

// 	]
// }
//database above no longer needed, we created our own

app.get('/',(req,res)=> {
	console.log('Welcome to root directory!!!')
	res.send('It is working!!!');
})

//old signin
// app.post('/signin', (req,res)=>{
// 	// Load hash from your password DB.
// 	bcrypt.compare("cookies2", '$2a$10$5yT01MSheCedqxa89al39eHBkCTjeVtKhXyaUbIZM8X8FBVDZg/hy', function(err, res) {
//     // res == true
//     console.log('first guess:', res);
// 	});
// 	bcrypt.compare("veggies", '$2a$10$5yT01MSheCedqxa89al39eHBkCTjeVtKhXyaUbIZM8X8FBVDZg/hy', function(err, res) {
// 	    // res = false
// 	console.log('second guess:', res);
// 	});
// 	if (req.body.email=database.users[0].email && 
// 		req.body.password === database.users[0].password){
// 		// res.json('Login success!')
// 		res.json(database.users[0]); 
// 		// from 273
// 	} else {
// 		res.status(404).json('Error logging in.')
// 	}
// 	res.json('signing in!')
// })

//dependency injection
app.post('/signin',(req,res)=>{ signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt)} )

app.get('/profile/:id',(req,res)=>{ profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{ image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{ image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running smoothly on port ${process.env.PORT}`)
}); 


/*

/-> res = this is working
/signin -> post = success/fail
/register -> post = new user
/profile/:userId -> get = returns the user
/image -> put --> user object or count
*/