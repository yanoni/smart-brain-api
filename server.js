// Installed Libraries
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

// Controller Modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Connect to database
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'yanoni',
    database : 'smart-brain'
  }
});

// Start the app
const app = express();

app.use (express.json());  // parse json first

app.use (cors());

// The following won't be used -- just for testing
app.get ('/', (req, res) => { res.send('It is working!') })
	// db.select('*').from('users')
	// 	.then(users => {
	// 		res.json(users);
	// 	})
	// 	.catch(err => res.status(400).json('error getting users'));
})

// Handle user sign-in
app.post ('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

// Handle registration of new user
app.post ('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

// Get User Profile
app.get ('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
})

// Update image entry count
app.put ('/image', (req, res) => {
	image.handleImage(req, res, db)
})

// Fetch the requested image
app.post ('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

// Listen for requests
app.listen (process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})