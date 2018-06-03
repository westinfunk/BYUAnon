const redis = require('../db');
const seed = async () => {
  //Seed DB
  await redis.flushdb();

  //Create users
  await redis.hmset('user:' + 'u1', {
    ip: '127.0.0.6',
    score: 100,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.hmset('user:' + 'u2', {
    ip: '127.0.0.2',
    score: 100,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.hmset('user:' + 'u3', {
    ip: '127.0.0.3',
    score: 100,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.hmset('user:' + 'u4', {
    ip: '127.0.0.4',
    score: 100,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.hmset('user:' + 'u5', {
    ip: '127.0.0.5',
    score: 100,
    timestamp: Math.floor(Date.now() / 1000)
  });

  //Create messages
  await redis.hmset('message:' + 'm1', {
    ip: '127.0.0.9',
    text: 'first message',
    author: 'u1',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm1');
  await redis.lpush('user:' + 'u1' + ':message', 'm1');
  await redis.zadd('message:top', 0, 'm1');

  await redis.hmset('message:' + 'm2', {
    ip: '127.0.1.9',
    text: 'second message',
    author: 'u1',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm2');
  await redis.lpush('user:' + 'u1' + ':message', 'm2');
  await redis.zadd('message:top', 0, 'm2');

  await redis.hmset('message:' + 'm3', {
    ip: '127.0.2.9',
    text: 'third message',
    author: 'u1',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm3');
  await redis.lpush('user:' + 'u1' + ':message', 'm3');
  await redis.zadd('message:top', 0, 'm3');

  await redis.hmset('message:' + 'm4', {
    ip: '127.3.1.9',
    text: 'fourth message',
    author: 'u2',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm4');
  await redis.lpush('user:' + 'u2' + ':message', 'm4');
  await redis.zadd('message:top', 0, 'm4');

  await redis.hmset('message:' + 'm5', {
    ip: '127.2.8.9',
    text: 'fifth message',
    author: 'u2',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm5');
  await redis.lpush('user:' + 'u2' + ':message', 'm5');
  await redis.zadd('message:top', 0, 'm5');

  await redis.hmset('message:' + 'm6', {
    ip: '127.4.5.9',
    text: 'sixth message',
    author: 'u3',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm6');
  await redis.lpush('user:' + 'u3' + ':message', 'm6');
  await redis.zadd('message:top', 0, 'm6');

  await redis.hmset('message:' + 'm7', {
    ip: '127.3.10.9',
    text: 'seventh message',
    author: 'u3',
    deleted: 0,
    timestamp: Math.floor(Date.now() / 1000)
  });
  await redis.lpush('message', 'm7');
  await redis.lpush('user:' + 'u3' + ':message', 'm7');
  await redis.zadd('message:top', 0, 'm7');

  //create reply

  await redis.hmset('reply:' + 'r1', {
    ip: '127.5.5.5',
    text: 'first reply',
    author: 'u1',
    parent: 'm1',
    deleted: 0
  });
  await redis.lpush('reply', 'r1');
  await redis.lpush('user:' + 'u1' + ':reply', 'r1');
  await redis.zadd('user:' + 'u1' + ':repliedto', Date.now(), 'm1');
  await redis.rpush('message:' + 'm1' + ':reply', 'r1');

  await redis.hmset('reply:' + 'r2', {
    ip: '127.9.5.5',
    text: 'second reply',
    author: 'u2',
    parent: 'm1',
    deleted: 0
  });
  await redis.lpush('reply', 'r2');
  await redis.lpush('user:' + 'u2' + ':reply', 'r2');
  await redis.zadd('user:' + 'u2' + ':repliedto', Date.now(), 'm1');
  await redis.rpush('message:' + 'm1' + ':reply', 'r2');

  await redis.hmset('reply:' + 'r3', {
    ip: '127.0.5.5',
    text: 'third reply',
    author: 'u3',
    parent: 'm1',
    deleted: 0
  });
  await redis.lpush('reply', 'r3');
  await redis.lpush('user:' + 'u3' + ':reply', 'r3');
  await redis.zadd('user:' + 'u3' + ':repliedto', Date.now(), 'm1');
  await redis.rpush('message:' + 'm1' + ':reply', 'r3');

  await redis.hmset('reply:' + 'r4', {
    ip: '127.5.2.1',
    text: 'fourth reply',
    author: 'u1',
    parent: 'm1',
    deleted: 0
  });
  await redis.lpush('reply', 'r4');
  await redis.lpush('user:' + 'u1' + ':reply', 'r4');
  await redis.zadd('user:' + 'u1' + ':repliedto', Date.now(), 'm1');
  await redis.rpush('message:' + 'm1' + ':reply', 'r4');

  //upvote messages
  await redis.sadd('message:' + 'm1' + ':upvote', 'u1');
  await redis.hincrby('user:' + 'u1', 'score', 10);
  await redis.zincrby('message:top', 1, 'm1');

  await redis.sadd('message:' + 'm1' + ':upvote', 'u2');
  await redis.hincrby('user:' + 'u1', 'score', 10);
  await redis.zincrby('message:top', 1, 'm1');

  await redis.sadd('message:' + 'm1' + ':upvote', 'u3');
  await redis.hincrby('user:' + 'u1', 'score', 10);
  await redis.zincrby('message:top', 1, 'm1');

  //downvote messages
  await redis.sadd('message:' + 'm6' + ':downvote', 'u1');
  await redis.hincrby('user:' + 'u3', 'score', -10);
  await redis.zincrby('message:top', -1, 'm6');

  await redis.sadd('message:' + 'm6' + ':downvote', 'u2');
  await redis.hincrby('user:' + 'u3', 'score', -10);
  await redis.zincrby('message:top', -1, 'm6');

  await redis.sadd('message:' + 'm6' + ':downvote', 'u3');
  await redis.hincrby('user:' + 'u3', 'score', -10);
  await redis.zincrby('message:top', -1, 'm6');

  //upvote reply
  await redis.sadd('reply:' + 'r2' + ':upvote', 'u1');
  await redis.hincrby('user:' + 'u2', 'score', 10);

  await redis.sadd('reply:' + 'r2' + ':upvote', 'u2');
  await redis.hincrby('user:' + 'u2', 'score', 10);

  await redis.sadd('reply:' + 'r2' + ':upvote', 'u3');
  await redis.hincrby('user:' + 'u2', 'score', 10);

  //downvote reply
  await redis.sadd('reply:' + 'r4' + ':downvote', 'u3');
  await redis.hincrby('user:' + 'u1', 'score', -10);
};

module.exports = seed;
