const asyncRedis = require('async-redis');
const client = asyncRedis.createClient();

client.on('error', function(err) {
  console.log('Error!!!!! ' + err);
});

client.on('connect', function(message) {
  console.log('Connected to Redis server');
});

module.exports = client;
