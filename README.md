# Simple Chat App

### Description

This is the REST API for my simple chat app built with the [NestJS](https://github.com/nestjs/nest) framework, [TypeORM](https://github.com/typeorm/typeorm) and [PostgreSQL](https://www.postgresql.org/) as database.
This API was made to be consumed by [this](https://github.com/Towers77/reactjs-simple-chat-app) frontend app.

### What you need to install and run the app

- Nodejs v18.16.0
- Docker v24.0.6, build ed223bc

### Installing dependencies

```bash
$ yarn install
```

### Running the app

To run this app, first, you will need to set up the database using Docker, for this, run the following command (make sure you have Docker installed and you are in the root directory of this project):

```bash
$ docker compose up -d
```

Then, setup the environment variables in .env (you have to create the file) based on the example in this repo.
Database credentials are in the docker-compose file, and you can just put whatever you want as the jwt secrets.
URL should be whatever url is your frontend hosted at (if you're using [my frontend example](https://github.com/Towers77/reactjs-simple-chat-app) then just put 'http://localhost:5173')

Once the database is up, you can start the app by running one of the following:

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```
