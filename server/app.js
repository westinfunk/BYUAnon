const express = require('express');
const bodyParser = require('body-parser');

const {
  handleGetNewFeed,
  handleGetTopFeed
} = require('./handlers/feedHandler');
const {
  handleRegisterUser,
  handleGetUserMessages,
  handleGetUserReplies,
  handleGetMessagesUserRepliedTo,
  handleGetUserInfo,
  handleGetUserScore
} = require('./handlers/userHandler');
const {
  handlePostMessage,
  handleUpvoteMessage,
  handleDownvoteMessage,
  handleDeleteMessage
} = require('./handlers/messageHandler');
const {
  handleGetMessageReplies,
  handlePostReplyToMessage,
  handleDownvoteReply,
  handleUpvoteReply,
  handleDeleteReply
} = require('./handlers/replyHandler');

const app = express();
app.use(bodyParser.json());

app.get('/feed/new', handleGetNewFeed);

app.get('/feed/top', handleGetTopFeed);

app.post('/message', handlePostMessage);

app.post('/message/:id/reply', handlePostReplyToMessage);

app.get('/message/:id/reply', handleGetMessageReplies);

app.post('/message/:id/upvote', handleUpvoteMessage);

app.post('/message/:id/downvote', handleDownvoteMessage);

app.delete('/message/:id', handleDeleteMessage);

app.get('/user/score', handleGetUserScore);

app.post('/user/register', handleRegisterUser);

app.get('/user/message', handleGetUserMessages);

app.get('/user/reply', handleGetMessagesUserRepliedTo);

app.post('reply/:id/downvote', handleDownvoteReply);

app.post('reply/:id/upvote', handleUpvoteReply);

app.delete('reply/:id', handleDeleteReply);

module.exports = app;
