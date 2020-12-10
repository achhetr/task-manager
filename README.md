# Task Manager

This is a Node application which serves as a backend for a 'Task Manager App' from Heroku server.

Key feature includes -

-   Create your account

-   Receive an email confirmation for account creation greeting

-   Authentication and Authorisation

-   Create, manage, update, delete tasks

-   Upload profile picture

-   Cascade delete users and all the task

-   Receive an email after closing your account

I love building this project, if you have any suggestions please pass it on :)

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

[MIT](https://github.com/achhetr/task-manager/blob/master/License.txt)
