const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../components/validation');
const multer = require('multer');
const upload = multer();

//Render login page
router.get('/', (req, res) => {
	console.log(req.cookies);
	let notify = '';

	res.render('user/login', { notify });
});

//Post a login request
router.post('/', upload.none(), async (req, res) => {
	//Validate the data using Joi
	const { error } = loginValidation(req.body);
	if (error) {
		return console.log(error.details[0].message), res.redirect('/login');
	}
	//Check if the user exists in the database.
	const user = await User.findOne({ username: req.body.username });
	if (!user)
		return console.log('Username is not found!'), res.redirect('/login');

	//Check password
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass)
		return console.log(`Invalid Password`), res.redirect('/login');

	//Create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token);

	//Set cookies
	res.cookie('token', token, {
		expires: new Date(Date.now() + 900000),
		httpOnly: true,
	});
	res.cookie('user', req.body.username, {
		expires: new Date(Date.now() + 900000),
		httpOnly: true,
	});

	console.log(`User has been logged in.`);
	notify = 'Logged in';
	//Redirect to shoes
	res.redirect('/user_home');
});

module.exports = router;
