// CRUD create, read, update and delete

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1/27017';
const databaseName = 'task-manager';

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error, client) => {
		if (error) {
			return console.log('Unable to connect to database!');
		}
		console.log('Connected correctly!');
		const db = client.db(databaseName);

		// db.collection('users').insertOne(
		// 	{
		// 		name: 'Akash',
		// 		age: 23,
		// 	},
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert user');
		// 		}

		// 		console.log(result);
		// 	}
		// );

		// db.collection('users').insertMany(
		// 	[
		// 		{
		// 			name: 'Jen',
		// 			age: 28,
		// 		},
		// 		{
		// 			name: 'Gunther',
		// 			age: 27,
		// 		},
		// 	],
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert user');
		// 		}

		// 		console.log(result.ops);
		// 	}
		// );

		db.collection('tasks').insertMany(
			[
				{
					description: 'This is for js project',
					completed: true,
				},
				{
					description: 'This is for react project',
					completed: false,
				},
				{
					description: 'This is for node project',
					completed: true,
				},
			],
			(error, result) => {
				if (error) {
					return console.log(error);
				}

				console.log(result.ops);
			}
		);
	}
);
