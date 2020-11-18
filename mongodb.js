// CRUD create, read, update and delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

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

		// db.collection('users').findOne(
		// 	{ _id: new ObjectID('5fb063ef507dab9c9f630065') },
		// 	(error, user) => {
		// 		if (error) {
		// 			return console.log('Unable to fetch');
		// 		}

		// 		console.log(user);
		// 	}
		// );

		// 	db.collection('users')
		// 		.find({ age: 28 })
		// 		.toArray((error, users) => {
		// 			if (error) {
		// 				return console.log('Unable to fetch');
		// 			}
		// 			console.log(users);
		// 		});

		// db.collection('users').findOne(
		// 	{ _id: new ObjectID('5fb196224af30ac4efd43e3e') },
		// 	(error, user) => {
		// 		if (error) return console.log(error);

		// 		console.log(user);
		// 	}
		// );

		// db.collection('tasks')
		// 	.find({ completed: true })
		// 	.toArray((error, users) => {
		// 		if (error) return console.log(error);

		// 		users.forEach((user) => console.log(user));
		// 	});

		//5fadab605d4501915edbd033

		// db.collection('users')
		// 	.updateOne(
		// 		{
		// 			_id: new ObjectID('5fadab605d4501915edbd033'),
		// 		},
		// 		{
		// 			$inc: {
		// 				age: 10,
		// 			},
		// 		}
		// 	)
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((error) => console.log(error));

		// db.collection('tasks')
		// 	.updateMany(
		// 		{
		// 			completed: false,
		// 		},
		// 		{
		// 			$set: {
		// 				completed: true,
		// 			},
		// 		}
		// 	)
		// 	.then((result) => {
		// 		console.log(result);
		// 	})
		// 	.catch((error) => console.log(error));

		// 	db.collection('users')
		// 		.deleteMany({
		// 			age: 27,
		// 		})
		// 		.then((result) => console.log(result))
		// 		.catch((error) => console.log(error));

		db.collection('tasks')
			.deleteOne({
				description: 'This is for node project',
			})
			.then((result) => console.log(result))
			.catch((error) => console.log(error));
	}
);
// 5fb063ef507dab9c9f630065
