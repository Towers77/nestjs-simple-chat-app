# Simple Chat App

### Description

This is the REST API for my simple chat app built with the [NestJS](https://github.com/nestjs/nest) framework, [TypeORM](https://github.com/typeorm/typeorm) and [PostgreSQL](https://www.postgresql.org/) as database.
This API was made to be consumed by this frontend app.

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

Once the database is up, you can start the app by running one of the following:

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```
