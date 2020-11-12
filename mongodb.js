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

		db.collection('users').insertOne({
			name: 'Akash',
			age: 23,
		});
	}
);
