if (!process.env.database && process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  database: process.env.database,
  username: process.env.username,
  password: process.env.password,
  host: process.env.host,
  dialect: process.env.dialect,
  use_env_variable: process.env.use_env_variable,
}
