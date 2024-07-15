import { Sequelize } from "sequelize";
import "dotenv/config";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT;
const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  port: DB_PORT,
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: console.log, // Enable logging
});

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export { connection };
