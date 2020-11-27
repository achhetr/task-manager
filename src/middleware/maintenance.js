const maintenance = async (req, res, next) => {
	return res.status(503).send('Try again later, currently under maintenance');
};

module.exports = maintenance;
