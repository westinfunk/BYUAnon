const _ = require('lodash');
const client = require('./db');

const run = async function() {
  const result = await client.hmset('somehash', { a: '1', b: '2' });
  console.log(result);
};

run();
