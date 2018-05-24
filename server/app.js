const express = require('express');
const app = express();

app.post('/register', async (req, res) => {
  //
});

app.post('/messages', async (req, res) => {
  //
});

app.post('/');

app.get('/messages/new', async (req, res) => {
  // New Feed
});

app.get('/messages/top', async (req, res) => {
  // Top Feed
});

app.get('/messages/upvote', async (req, res) => {
  //req.query.messageId
});

app.get('/messages/downvote', async (req, res) => {
  //req.query.messageId
});

app.get('/user/messages', async (req, res) => {
  //req.query.userId
});

app.get('/user/replies', async (req, res) => {
  //req.query.userId
});

app.get('/replies', async (req, res) => {
  //req.query.messageId
});

app.get('replies/downvote', async (req, res) => {
  //req.query.replyId
});

app.get('replies/upvote', async (req, res) => {
  //req.query.replyId
});

module.exports = app;
