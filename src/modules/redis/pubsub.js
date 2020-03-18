const options = require('./config').options
const redis = require('redis');

const subscriber = redis.createClient(options);
const publisher = redis.createClient(options);

module.exports = {
  sub: subscriber,
  pub: publisher
}