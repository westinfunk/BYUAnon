const express = require('express');
const bodyParser = require('body-parser');

const {
  handleGetNewFeed,
  handleGetTopFeed
} = require('./handlers/feedHandler');
const {
  handleRegisterUser,
  handleGetUserMessages,
  handleGetUserReplies
} = require('./handlers/userHandler');
const {
  handlePostMessage,
  handleUpvoteMessage,
  handleDownvoteMessage,
  handleDeleteMessage
} = require('./handlers/messageHandler');
const {
  handlePostReply,
  handleDownvoteReply,
  handleUpvoteReply,
  handleDeleteReply
} = require('./handlers/replyHandler');

const app = express();
app.use(bodyParser.json());

app.get('/feed/new', async (req, res) => {
  console.log('REQUEST', req);
  // New Feed
});

app.get('/feed/top', async (req, res) => {
  //
  // Top Feed
});

app.post('/message', async (req, res) => {
  //
});

app.post('/message/:id/reply', async (req, res) => {
  //
});

app.post('/message/:id/upvote', async (req, res) => {
  //req.query.messageId
});

app.post('/message/:id/downvote', async (req, res) => {
  //req.query.messageId
});

app.post('/user/register', handleRegisterUser);

app.get('/user/:id/message', async (req, res) => {
  //req.query.userId
});

app.get('/user/:id/reply', async (req, res) => {
  //req.query.userId
});

app.get('/reply', async (req, res) => {
  //req.query.messageId
});

app.post('reply/:id/downvote', async (req, res) => {
  //req.query.replyId
});

app.post('reply/:id/upvote', async (req, res) => {
  //req.query.replyId
});

module.exports = app;
