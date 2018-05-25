const client = require('./db');

const seed = async function() {
  await client.lpush('list', 'first', 'second', 'third', 'fourth', 'fifth');
  await client.lpush('list', 'sixth');
  await client.lpush('list', 'seventh', 'eigth', 'ninth', 'tenth', 'eleventh');
  const results = await client.lrange('list', 0, 9);
  console.log(results);
};

seed();
