# Muqo Backend

## Directory Structure (relative to src/)

- **bin/** - Contains the code needed for starting up a server (only a www server for now).
- **constants/** - Contains constants for various purposes needed in various places of code.
- **db/** - Contains all the functions for interacting with the database that can be reused
  across many different files.
- **routes/** - Contains the functions for resolving routes (e.g. when accessed via HTTP server
  like GET users/posts).
- **utils/** - Contains reusable utility functions needed in various parts of the code.
- **app.js** - Initializes the express app (all the middleware + routes).

To run the backend, you will need the following programs installed:

- [Node.js 12](https://nodejs.org)
- [Yarn](https://classic.yarnpkg.com)
- [PostgreSQL](https://postgresql.org)

Once you've installed those programs, make sure to create a database called muqo in PostgreSQL, and then create an .env file in the root of the server directory with the following contents:

```dotenv
DB_HOST=localhost
DB_USER=<your postgres username>
DB_PASSWORD=<your postgres password>
DB_NAME=muqo
JWT_SECRET=<JWT secret, can be anything when developing>
```

To install the necessary dependencies for the server, run the following command in its root directory:

```shell script
yarn install
```

Then, to start the server with nodemon (where it will restart after any of the server files are changed), run the following command in the root directory of the server:

```shell script
yarn dev
```

And the server should then be running on port 3000! (To specify a different port to run on, add to the .env file a line with `PORT=<new port>`)

For documentation, run:

```shell script
yarn docs
```

and visit [localhost:3001](http://localhost:3001) in your browser to view the documentation.

# Pushing to the codebase

ESLint and Prettier have been configured to run before you push the code to GitHub. If ESLint is throwing errors and preventing you from pushing, do try and fix those errors as those may be common sources of bugs. If you want to lint before pushing manually, you can run `yarn lint` in either the Muqo or the MuqoBackend directory. You can also run `yarn prettier` to prettify your code.

# Running Docker on local

(To be updated)
To build the docker image:
`docker build -t mq-api .`

To run it with interactive terminal:
`docker run -it -p 3000:3000 mq-api`
`it` - Interactive terminal
`3000` - Machine port
`3000` - Docker container port

To run it in the background/detached
`docker run -d -p 3000:3000 mq-api`

To check if it's running in the background
`docker ps`

# How amazon is set up

https://www.youtube.com/watch?v=00qQaoC-5ig

- Create a ECS cluster - Fargate (no vpc)
- Create a Task definition - Fargate
- Create a Target Group - IP - port 3000 as that's the docker port
- Create a load balancer - application - keep 80 - select target group from previous step
- Create a service - fargate - custom tcp - 3000 (docker)

For setting up SSL
https://www.youtube.com/watch?v=TsVO14-lqp0&t=565s

- Set up a listener for load balancer
- Then go to the security group for the load balancer and add https inbound rule

IAM Role

- https://aws.amazon.com/blogs/devops/build-a-continuous-delivery-pipeline-for-your-container-images-with-amazon-ecr-as-source/
  Set up an IAM role AmazonEC2ContainerRegistryPowerUser
