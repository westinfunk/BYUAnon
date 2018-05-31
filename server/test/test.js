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
  getMessageDataFromIds,
  deleteMessage,
  upvoteMessage,
  downvoteMessage,
  removeUpvoteFromMessage,
  removeDownvoteFromMessage,
  getMessageReplyIds,
  getNewMessageIds
} = require('../models/messageModel');
const {
  postMessageReply,
  getReplyDataFromId,
  getReplyDataFromIds,
  getIdOfParentMessage,
  addUpvoteToReply,
  addDownvoteToReply
} = require('../models/replyModel');

describe('Database', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('Db Connection', () => {
    it('should add user to database', async () => {
      const response = await addNewUser('999.9.9.9');
      assert.strictEqual(response, 'u00000001');
    });

    it('should add messages to database', async () => {
      const response = await postMessage('posting message', 'u1', '111.1.1.1');
      assert.strictEqual(response, 'm00000001');
    });

    it('should add replies to database', async () => {
      const response = await postMessageReply(
        'posting reply',
        'm1',
        'u1',
        '111.1.1.1'
      );
      assert.strictEqual(response, 'r00000001');
    });
  });

  describe('User Model', () => {
    it('should increase the "user" list size in database', async () => {
      const originalUserListSize = await redis.llen('user');
      addNewUser('127.0.0.99');
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

  describe('Message Model', () => {
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

    it('should get a list of message data when given list of message ids', async () => {
      const messageIds = ['m1', 'm2', 'm3', 'm4'];
      const messagesData = await getMessageDataFromIds(messageIds, 'u1');
      assert.equal(messagesData[0].text, 'first message');
      assert.equal(messagesData[3].text, 'fourth message');
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
      assert.equal(updatedVoted.userUpvoted, '1');
    });

    it('should tell when requesting user has downvoted', async () => {
      const origVoted = await getMessageDataFromId('m3', 'TESTUSER');
      await downvoteMessage('m3', 'TESTUSER');
      const updatedVoted = await getMessageDataFromId('m3', 'TESTUSER');
      assert.equal(origVoted.userDownvoted, '0');
      assert.equal(updatedVoted.userDownvoted, '1');
    });

    it('should add to "new" messages list', async () => {
      const originalLength = await redis.llen('message');
      await postMessage('test message', 'TESTUSER', '000.0.0.0');
      const updatedLength = await redis.llen('message');
      assert.equal(updatedLength, parseInt(originalLength) + 1);
    });

    it('should add to "top" messages set', async () => {
      const originalLength = await redis.zcount('message:top', '-inf', '+inf');
      const msgId = await postMessage('test message', 'TESTUSER', '000.0.0.0');
      await upvoteMessage(msgId, 'A1');
      await upvoteMessage(msgId, 'B2');
      await upvoteMessage(msgId, 'C3');
      await upvoteMessage(msgId, 'D4');
      const updatedLength = await redis.zcount('message:top', '-inf', '+inf');
      assert.equal(updatedLength, parseInt(originalLength) + 1);
    });
  });

  describe('Reply Model', () => {
    it('should return reply data when given reply id', async () => {
      const replyData = await getReplyDataFromId('r1', 'TESTUSER');
      assert.strictEqual(replyData.ip, '127.5.5.5');
      assert.strictEqual(replyData.text, 'first reply');
      assert.strictEqual(replyData.author, 'u1');
      assert.strictEqual(replyData.parent, 'm1');
    });

    it("should update user's reply list size when they send a reply", async () => {
      const origSize = await redis.llen('user:' + 'TESTUSER' + ':reply');
      await postMessageReply('test text', 'm1', 'TESTUSER', '111.1.1.1');
      const updatedSize = await redis.llen('user:' + 'TESTUSER' + ':reply');
      assert.equal(updatedSize, parseInt(origSize) + 1);
    });

    it('should get list of reply data when given id list', async () => {
      const testReplyIds = ['r1', 'r2', 'r3'];
      const replyData = await getReplyDataFromIds(testReplyIds);
      assert.equal(replyData[0].text, 'first reply');
      assert.equal(replyData[1].text, 'second reply');
      assert.equal(replyData[2].text, 'third reply');
    });

    it('should increase size of global reply list when reply is sent', async () => {
      const origSize = await redis.llen('reply');
      await postMessageReply('test text', 'm1', 'TESTUSER', '111.1.1.1');
      const updatedSize = await redis.llen('reply');
      assert.equal(updatedSize, parseInt(origSize) + 1);
    });

    it("should increase size of a message's reply list when reply is posted to message", async () => {
      const origSize = await redis.llen('user:' + 'TESTUSER' + ':reply');
      await postMessageReply('test text', 'm1', 'TESTUSER', '111.1.1.1');
      const updatedSize = await redis.llen('user:' + 'TESTUSER' + ':reply');
      assert.equal(updatedSize, parseInt(origSize) + 1);
    });

    it('should get id of parent message', async () => {
      const parentId = await getIdOfParentMessage('r1');
      assert.equal(parentId, 'm1');
    });

    it('should tell when requesting user has upvoted', async () => {
      const replyData = await getReplyDataFromId('r2', 'u1');
      assert.equal(replyData.userUpvoted, '1');
    });

    it('should tell when requesting user has downvoted', async () => {
      const replyData = await getReplyDataFromId('r4', 'u3');
      assert.equal(replyData.userDownvoted, '1');
    });

    it('should tell when requesting user has *not* upvoted', async () => {
      const replyData = await getReplyDataFromId('r2', 'u99');
      assert.equal(replyData.userUpvoted, '0');
    });

    it('should tell when requesting user has *not* downvoted', async () => {
      const replyData = await getReplyDataFromId('r3', 'u99');
      assert.equal(replyData.userUpvoted, '0');
    });

    it('should allow a user to upvote a reply', async () => {
      const origReplyData = await getReplyDataFromId('r3', 'TESTUSER');
      await addUpvoteToReply('r3', 'TESTUSER');
      const replyData = await getReplyDataFromId('r3', 'TESTUSER');
      assert.equal(replyData.score, origReplyData.score + 1);
    });

    it('should allow a user to downvote a reply', async () => {
      const origReplyData = await getReplyDataFromId('r3', 'TESTUSER');
      await addDownvoteToReply('r3', 'TESTUSER');
      const replyData = await getReplyDataFromId('r3', 'TESTUSER');
      assert.equal(replyData.score, origReplyData.score - 1);
    });
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

describe('Handlers', () => {
  describe('User Handler', () => {
    it('should add a user and respond with the user id');
    it('should get message id list of messages the user posted');
    it('should get message data from messages user posted');
    it('should get message id list of messages user replied to');
    it('should get message data from messages user replied to');
  });

  describe('Message Handler', () => {
    it('should post add messages ');
  });

  describe('Reply Handler', () => {});

  describe('Feed Handler', () => {});
});
