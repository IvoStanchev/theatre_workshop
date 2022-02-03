const router = require('express').Router();
const Play = require('../models/Play');

//Render the home unregistered page
router.get('/', async (req, res) => {
	try {
		const plays = await (
			await Play.find().lean()
		).filter((x) => {
			if (x.is_public === true) {
				return x;
			}
		});

		plays.sort((a, b) => {
			return b.users_liked.length - a.users_liked.length;
		});
		let notify = `Dom content loaded`;
		res.render('home/guest-home', { plays, notify });
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
