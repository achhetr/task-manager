const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		unique: true,
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
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '',
	foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, 'thisistask');

	this.tokens = this.tokens.concat({ token });
	await this.save();

	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) throw new Error('Email or Password is correct');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error('Email or Password is correct');

	return user;
};

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}

	next();
});

userSchema.pre('remove', async function (next) {
	await Task.deleteMany({ owner: this._id });
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
