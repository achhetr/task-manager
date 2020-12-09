const express = require('express');

const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	// const task = new Task(req.body);

	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', auth, async (req, res) => {
	let limit, skip;
	const findTask = {
		owner: req.user._id,
	};

	if (req.query.completed) {
		findTask.completed = req.query.completed === 'true';
	}
	if (parseInt(req.query.limit)) {
		limit = parseInt(req.query.limit);
	}
	if (parseInt(req.query.skip)) {
		skip = parseInt(req.query.skip);
	}

	try {
		const tasks = await Task.find(findTask).limit(limit).skip(skip);
		res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) return res.status(404).send('Task not found');

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const allowedUpdates = ['description', 'completed'];
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) return res.status(404).send('Invalid updates');

	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) return res.status(404).send('Task not found');

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();

		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) return res.status(404).send('Task not found');

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
