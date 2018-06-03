const redis = require('../db');
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

const seed = async () => {
  redis.flushdb();

  const mId01 = await postMessage('first', 'testuser', '000.0.0.0.');
  const mId02 = await postMessage('second', 'testuser', '000.0.0.0.');
  const mId03 = await postMessage('third', 'testuser', '000.0.0.0.');
  const mId04 = await postMessage('fourth', 'testuser', '000.0.0.0.');
  const mId05 = await postMessage('fifth', 'testuser', '000.0.0.0.');
  const mId06 = await postMessage('sixth', 'testuser', '000.0.0.0.');
  const mId07 = await postMessage('seventh', 'testuser', '000.0.0.0.');
  const mId08 = await postMessage('eigth', 'testuser', '000.0.0.0.');
  const mId09 = await postMessage('ninth', 'testuser', '000.0.0.0.');
  const mId10 = await postMessage('tenth', 'testuser', '000.0.0.0.');
  const mId11 = await postMessage('elevent', 'testuser', '000.0.0.0.');
  const mId12 = await postMessage('twelth', 'testuser', '000.0.0.0.');
  const mId13 = await postMessage('thirteenth', 'testuser', '000.0.0.0.');
  const mId14 = await postMessage('fourteenth', 'testuser', '000.0.0.0.');
  const mId15 = await postMessage('fifteenth', 'testuser', '000.0.0.0.');
  const mId16 = await postMessage('sixteenth', 'testuser', '000.0.0.0.');
  const mId17 = await postMessage('seventeenth', 'testuser', '000.0.0.0.');
  const mId18 = await postMessage('eighteenth', 'testuser', '000.0.0.0.');
  const mId19 = await postMessage('nineteenth', 'testuser', '000.0.0.0.');
  const mId20 = await postMessage('twentieth', 'testuser', '000.0.0.0.');
  const mId21 = await postMessage('twenty-first', 'testuser', '000.0.0.0.');
  const mId22 = await postMessage('twenty-second', 'testuser', '000.0.0.0.');
  const mId23 = await postMessage('twenty-third', 'testuser', '000.0.0.0.');
  const mId24 = await postMessage('twenty-fourth', 'testuser', '000.0.0.0.');
  const mId25 = await postMessage('twenty-fifth', 'testuser', '000.0.0.0.');
  const mId26 = await postMessage('twenty-sixth', 'testuser', '000.0.0.0.');
  const mId27 = await postMessage('twenty-seventh', 'testuser', '000.0.0.0.');
  const mId28 = await postMessage('twenty-eight', 'testuser', '000.0.0.0.');

  await upvoteMessage(mId05, 'testuser01');
  await upvoteMessage(mId05, 'testuser02');
  await upvoteMessage(mId05, 'testuser03');
  await upvoteMessage(mId05, 'testuser04');
  await upvoteMessage(mId05, 'testuser05');
  await upvoteMessage(mId05, 'testuser06');
  await upvoteMessage(mId05, 'testuser07');
  await upvoteMessage(mId11, 'testuser01');
  await upvoteMessage(mId11, 'testuser02');
  await upvoteMessage(mId11, 'testuser03');
  await upvoteMessage(mId08, 'testuser04');
  await upvoteMessage(mId02, 'testuser01');
  await upvoteMessage(mId02, 'testuser02');

  const rId01 = await postMessageReply(
    'first reply',
    mId01,
    'testuser',
    '000.0.0.0.'
  );
  const rId02 = await postMessageReply(
    'second reply',
    mId01,
    'testuser',
    '000.0.0.0.'
  );
  const rId03 = await postMessageReply(
    'third reply',
    mId01,
    'testuser',
    '000.0.0.0.'
  );
  const rId04 = await postMessageReply(
    'fourth reply',
    mId01,
    'testuser',
    '000.0.0.0.'
  );
  const rId05 = await postMessageReply(
    'fifth reply',
    mId02,
    'testuser',
    '000.0.0.0.'
  );
  const rId06 = await postMessageReply(
    'sixth reply',
    mId02,
    'testuser',
    '000.0.0.0.'
  );
  const rId07 = await postMessageReply(
    'seventh reply',
    mId02,
    'testuser',
    '000.0.0.0.'
  );
  const rId08 = await postMessageReply(
    'eigth reply',
    mId02,
    'testuser',
    '000.0.0.0.'
  );
  const rId09 = await postMessageReply(
    'ninth reply',
    mId02,
    'testuser',
    '000.0.0.0.'
  );
  const rId10 = await postMessageReply(
    'tenth reply',
    mId28,
    'testuser',
    '000.0.0.0.'
  );
  const rId11 = await postMessageReply(
    'elevent reply',
    mId28,
    'testuser',
    '000.0.0.0.'
  );
  const rId12 = await postMessageReply(
    'twelth reply',
    mId12,
    'testuser',
    '000.0.0.0.'
  );
  const rId13 = await postMessageReply(
    'thirteenth reply',
    mId13,
    'testuser',
    '000.0.0.0.'
  );
};

seed();

module.exports = seed;
