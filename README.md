## Requitements
- Node v12.16.3
- PostgreSQL 12.2

## To install:
- Clone this project
- Run `yarn install` (Installs all the dependencies for your project)
- Create ormconfig.json file `cp ormconfig.json.example ormconfig.json`  (remember update the database data)
- Run `yarn typeorm migration:run` (Creates all of the database tables)

## Run the server
- Run `yarn dev`
- Go to http://localhost:4000/graphql