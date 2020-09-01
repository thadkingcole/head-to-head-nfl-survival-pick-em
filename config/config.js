// this file replaces config.json & allows the use of env variables
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.LOCALDB_USERNAME,
    database: process.env.LOCALDB_DATABASE,
    host: process.env.LOCALDB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
  },
};
