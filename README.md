## Express + GraphQL

[![Build Status](https://travis-ci.com/albertcito/nodejs-web-typescript.svg?branch=production)](https://travis-ci.com/albertcito/nodejs-web-typescript)

## Requitements
- Node v15
- Postgres

## To install:
- Clone this project
- Create .env file `cp .env.example .env`
- Run `yarn install` (Installs all the dependencies for your project)
- Run postgress: `postgres -D /usr/local/var/postgres`
- Run `yarn typeorm migration:run` (Creates all of the database tables)

## Faker Data
To populate the DB with faker data. Using [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding)
- `yarn seeding seed`

## Run the server
- Run `yarn dev`
- Go to http://localhost:4000/graphql/
- Run this query
```graphql
mutation {
  login(email:"me@albertcito.com", password:"Hola12345") {
    token
  }
}
```
- Add the token in HTTP HEADERS tab to run the private queries:
```json
{
  "Authorization": "Bearer ${token}"
}
```

## Contribute
Before to send a PR please do it:
- Run `yarn test` to run the test in dev environment.
- Run `yarn build` to ensure build is working.
- Run `yarn prod:test` to run the test in with the js files.
- Run `yarn eslint --fix` to validate the code style.
- Run `yarn ejslint --fix` to validate the ejs files.

## Email Debug
- To debug email in your localhost use this software: https://nodemailer.com/app/
