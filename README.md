## Requitements
- Node v12.16.3
- PostgreSQL 12.2

## To install:
- Clone this project
- Create .env file `cp .env.example .env`
- Run `yarn install` (Installs all the dependencies for your project)
- Create ormconfig.json file `cp ormconfig.json.example ormconfig.json`  (remember update the database data)
- Run `yarn typeorm migration:run` (Creates all of the database tables)

## Faker Data
To populate the DB with faker data. Using [typeorm-seeding](https://github.com/w3tecch/typeorm-seeding)
- `yarn seed:run`

## Run the server
- Run `yarn dev`
- Go to http://localhost:4000/graphql