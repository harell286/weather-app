const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mapbox_access_key: process.env.MAPBOX_ACCESS_KEY,
  weatherstack_access_key: process.env.WEATHERSTACK_ACCESS_KEY,
  port: process.env.PORT
};