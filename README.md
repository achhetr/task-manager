# Task Manager

This is a Node application which serves as a backend for a 'Task Manager App' from Heroku server.

## Installation

Download the zip or run following command

```bash
git clone https://github.com/achhetr/task-manager.git ./
```

## Usage

### Development

```
npm install
```

create local environment file and set

```
SENDGRID_API_KEY='Your send grid API key'
FROM_EMAIL='Your verified email in send grid'
PORT=3000 || 'or any other port'
JWT_SECRET='Any secret key'
MONGODB_URL='Your local mongodb url | url from mongodb atlas'
```

To run project locally using nodemon

```
npm run dev
```

use [link](http://localhost:3000)

### Production

To run production ready heroku project

use [link](https://akash-taskmanager.herokuapp.com)

## Contributing

Pull requests are welcome :)

## License

MIT
