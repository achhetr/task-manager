const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password'))
				throw new Error('Password cannot contain "password"');
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age is invalid');
			}
		},
	},
});

const me = new User({
	name: 'Akashs      ',
	email: 'Mike@email.com',
	password: '          11',
	age: 30,
});

// me.save()
// 	.then((result) => console.log(result))
// 	.catch((error) => console.error(error));

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const task = new Task({
	description: '     React certification   ',
});

task.save()
	.then((result) => console.log(result))
	.catch((error) => console.error(error));
