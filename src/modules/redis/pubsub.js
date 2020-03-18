const options = require('./config').options
const redis = require('redis');

const subscriber = redis.createClient(options);
const publisher = redis.createClient(options);

subscriber.on('error', function(err) {
  console.error(err);
});

publisher.on('error', function(err) {
  console.error(err);
});

module.exports = {
  sub: subscriber,
  pub: publisher
}