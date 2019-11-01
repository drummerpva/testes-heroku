require('dotenv/config');

module.exports = {
  client: 'mysql',
  connection: {
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
