const jwt = require('jsonwebtoken');

const User = require('../models/user');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		console.log(token);
		const decoded = jwt.verify(token, 'thisistask');
		console.log(decoded);

		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		});

		console.log(user);

		if (!user) throw new Error();

		req.users = user;

		next();
	} catch (error) {
		res.status(401).send({ error: 'Please authenticates' });
	}
};

module.exports = auth;
