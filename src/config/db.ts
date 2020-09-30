import path from "path";
import { ConnectionOptions } from "typeorm";
const connection: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "nodets",
  logging: true,
  synchronize: false,
  migrations: [path.join(__dirname, "../db/migrations/**/*.ts")],
  entities: [path.join(__dirname, "../db/entities/**/*.ts")],
  subscribers: [path.join(__dirname, "../db/subscribers/**/*.ts")],
  cli: {
    "entitiesDir": path.join(__dirname, "../db/entities"),
    "migrationsDir": path.join(__dirname, "../db/migrations"),
    "subscribersDir": path.join(__dirname, "../db/subscribers"),
 },
};

export default connection;