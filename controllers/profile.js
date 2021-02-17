const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db('users').where({
		id: id		// can be ({id} as of ES6)
	}).then(user => {
		if (user.length) {
			res.json(user[0]);			
		} else {
			res.status(400).json('user not found')
		};
	}).catch(err => rest.status(400).json('error getting user'));
}

module.exports = {
	handleProfileGet
}