const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			console.log(token.token, req.token, token.token !== req.token);
			return token.token !== req.token;
		});

		await req.user.save();

		res.send('Logged out from current device');
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('Logged out from all device');
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return res.status(404).send('User not found');
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const user = await User.findById(req.params.id);
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) return res.status(404).send('User does not exists');

		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) return res.status(404).send('User does not exists');

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
