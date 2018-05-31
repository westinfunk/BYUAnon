const assert = require('assert');
const redis = require('../db');
const seed = require('./seed');
const {
  addNewUser,
  getUser,
  getUserMessageIds,
  getUserReplyIds,
  getUserScore,
  incrementUserScore,
  decrementUserScore,
  getIdsOfMessagesUserRepliedTo
} = require('../models/userModel');
const {
  postMessage,
  getMessageDataFromId,
  deleteMessage,
  upvoteMessage,
  downvoteMessage,
  removeUpvoteFromMessage,
  removeDownvoteFromMessage,
  getMessageReplyIds
} = require('../models/messageModel');
const { postMessageReply } = require('../models/replyModel');

describe('Server Functions', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('Database Connection', () => {
    it('should add user to database', async () => {
      const response = await addNewUser('u99999999', '999.9.9.9');
      assert.strictEqual(response, 'OK');
    });

    it('should add messages to database', async () => {
      const response = await postMessage('posting message', 'u1', '111.1.1.1');
      assert.strictEqual(response, 'OK');
    });

    it('should add replies to database', async () => {
      const response = await postMessageReply(
        'posting reply',
        'm1',
        'u1',
        '111.1.1.1'
      );
      assert.strictEqual(response, 'OK');
    });
  });

  describe('User Model', () => {
    it('should increase the "user" list size in database', async () => {
      const originalUserListSize = await redis.llen('user');
      addNewUser('U12345678', '127.0.0.99');
      const updatedSize = await redis.llen('user');
      assert.strictEqual(originalUserListSize, updatedSize);
    });

    it('should return user data when given user id', async () => {
      const userData = await getUser('u1');
      assert.strictEqual(userData.ip, '127.0.0.6');
      assert.equal(userData.score, 120);
    });

    it('should return message ids of messages posted by user', async () => {
      const ids = await getUserMessageIds('u1');
      assert.deepEqual(ids, ['m3', 'm2', 'm1']);
    });

    it('should return reply ids of replies posted by user', async () => {
      const ids = await getUserReplyIds('u1');
      assert.deepEqual(ids, ['r4', 'r1']);
    });

    it('should return message ids of messages replied to by user', async () => {
      const ids = await getIdsOfMessagesUserRepliedTo('u1');
      assert.deepEqual(ids, ['m1']);
    });

    it('should get user score', async () => {
      const score = await getUserScore('u1');
      assert.equal(score, 120);
    });

    it('should be able to incremenet user score', async () => {
      const originalScore = await getUserScore('u2');
      await incrementUserScore('u2');
      const updatedScore = await getUserScore('u2');
      assert.equal(updatedScore, originalScore + 10);
    });

    it('should be able to decrement user score', async () => {
      const originalScore = await getUserScore('u3');
      await decrementUserScore('u3');
      const updatedScore = await getUserScore('u3');
      assert.equal(updatedScore, originalScore - 10);
    });
  });

  describe('Message', () => {
    it('should increase size of global message list when message is added', async () => {
      const originalSize = await redis.llen('message');
      await postMessage('test message', 'utest01', '444.4.4.4');
      const updatedSize = await redis.llen('message');
      assert.strictEqual(originalSize, updatedSize - 1);
    });

    it('should get message data by id', async () => {
      const messageData = await getMessageDataFromId('m1', 'u1');
      assert.strictEqual(messageData.ip, '127.0.0.9');
      assert.strictEqual(messageData.author, 'u1');
      assert.strictEqual(messageData.text, 'first message');
      assert.strictEqual(messageData.deleted, '0');
      assert.strictEqual(messageData.id, 'm1');
      assert(messageData.timestamp);
    });

    it('should update deleted field when deleting message', async () => {
      const undeletedMessage = await getMessageDataFromId('m1', 'u1');
      assert.equal(undeletedMessage.deleted, '0');
      deleteMessage('m1');
      const deletedMessage = await getMessageDataFromId('m1', 'u1');
      assert.equal(deletedMessage.deleted, '1');
    });

    it('should add user to upvote set when upvote command sent', async () => {
      const userExistsInUpvoteSet = await redis.sismember(
        'message:' + 'm1' + ':upvote',
        'TESTUSER'
      );
      await upvoteMessage('m1', 'TESTUSER');
      const updatedUserExistsInUpvoteSet = await redis.sismember(
        'message:' + 'm1' + ':upvote',
        'TESTUSER'
      );
      assert.equal(userExistsInUpvoteSet, '0');
      assert.equal(updatedUserExistsInUpvoteSet, 1);
    });

    it('should add user to downvote set when upvote command sent', async () => {
      const userExistsInDownvoteSet = await redis.sismember(
        'message:' + 'm1' + ':downvote',
        'TESTUSER'
      );
      await downvoteMessage('m1', 'TESTUSER');
      const updatedUserExistsInDownvoteSet = await redis.sismember(
        'message:' + 'm1' + ':downvote',
        'TESTUSER'
      );
      assert.equal(userExistsInDownvoteSet, '0');
      assert.equal(updatedUserExistsInDownvoteSet, '1');
    });

    it('should decrease message score when downvote is sent', async () => {
      const orig = await getMessageDataFromId('m2', 'TESTUSER');
      await downvoteMessage('m2', 'TESTUSER');
      const updated = await getMessageDataFromId('m2');
      assert.equal(parseInt(updated.score), parseInt(orig.score) - 1);
    });

    it('should increase message score when upvote is sent', async () => {
      const orig = await getMessageDataFromId('m2', 'TESTUSER');
      await upvoteMessage('m2', 'TESTUSER');
      const updated = await getMessageDataFromId('m2');
      assert.equal(parseInt(updated.score), parseInt(orig.score) + 1);
    });

    it('should get list of reply ids ordered from oldest to newest', async () => {
      const ids = await getMessageReplyIds('m1');
      assert.deepStrictEqual(ids, ['r1', 'r2', 'r3', 'r4']);
    });

    it('should tell when requesting user has upvoted', async () => {
      const origVoted = await getMessageDataFromId('m2', 'TESTUSER');
      await upvoteMessage('m2', 'TESTUSER');
      const updatedVoted = await getMessageDataFromId('m2', 'TESTUSER');
      assert.equal(origVoted.userDownvoted, '0');
      assert.equal(updatedVoted.userDownvoted, '1');
    });

    it('should tell when requesting user has downvoted', async () => {
      const origVoted = await getMessageDataFromId('m3', 'TESTUSER');
      await downvoteMessage('m3', 'TESTUSER');
      const updatedVoted = await getMessageDataFromId('m3', 'TESTUSER');
      assert.equal(origVoted.userDownvoted, '0');
      assert.equal(updatedVoted.userDownvoted, '1');
    });

    it('should not allow a user to have upvoted and downvoted a reply');

    it('should update authors score when upvoting');

    it('should update authors score when downvoting');

    it('should add to "new" messages list');

    it('should add to "top" messages list');
  });

  describe('Reply', () => {
    it('should return reply data');

    it("should update user's reply list size when they send a reply");

    it('should get list of reply data when given id list');

    it('should increase size of global reply list when reply is sent');

    it(
      "should increase size of a message's reply list when reply is posted to message"
    );

    it("should show up in message's reply list");

    it('should get id of parent message');

    it('should tell when requesting user is author');

    it('should tell when requesting user has upvoted');

    it('should tell when requesting user has downvoted');

    it('should allow a user to have upvoted and downvoted a reply');
  });

  describe('Feed', () => {
    it('should get newest messages posted');

    it(
      'should get older messages from "new" feed when given a lastSeenMessageId'
    );

    it('should get top messages posted');

    it(
      'should get lower-scored messages from "top" feed when given a lastSeenMessageId'
    );
  });
});
