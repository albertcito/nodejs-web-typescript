## Express + GraphQL

[![Build Status](https://travis-ci.com/albertcito/nodejs-web-typescript.svg?branch=production)](https://travis-ci.com/albertcito/nodejs-web-typescript)

## Requitements
- Node v12.16.3
- PostgreSQL 12.2

## To install:
- Clone this project
- Create .env file `cp .env.example .env`
- Run `yarn install` (Installs all the dependencies for your project)
- Run `yarn typeorm migration:run` (Creates all of the database tables)
- You can use any database engine in order to do it review the [TypeORM documentation](https://typeorm.io/#/).

## Faker Data
To populate the DB with faker data. Using [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding)
- `yarn seed:run`

## Run the server
- Run `yarn dev`
- Go to http://localhost:4000/graphql/public

## Contribute
Before to send a PR please do it:
- Run `yarn test` to ensure everithing is working well
- Run `yarn lint:eslint-fix` to validate the code style.
- Run `yarn ejslint ` to validate the ejs files.

## Email Debug
- To debug email in your localhost use this software: https://nodemailer.com/app/