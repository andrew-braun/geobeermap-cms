// ./config/env/production/database.js
const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);
console.log(config)
console.log("Running in production")
module.exports = () => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: false,
    },
    debug: false,
  },
});