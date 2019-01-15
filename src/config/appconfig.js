const isProduction = process.env == 'production';
module.exports = {
  APP_HOST: isProduction ? proces.env.APP_HOST : process.env.APP_HOST_DEV,
  SECURE_KEY: isProduction ? proces.env.SECURE_KEY : process.env.SECURE_KEY_DEV,
  PORT: isProduction ? proces.env.PORT : process.env.PORT_DEV,
  REDIS_URL: isProduction ? proces.env.REDIS_URL : process.env.REDIS_URL_DEV,
}
