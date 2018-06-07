const {
  getMessageReplies,
  postMessageReply,
  downvoteReply,
  upvoteReply,
  removeDownvoteFromReply,
  getReplyAuthorId,
  deleteReply
} = require('../models/replyModel');

const handleGetMessageReplies = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.get('token');
    const replies = await getMessageReplies(messageId, userId);
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Server error getting replies' });
  }
};

const handlePostReplyToMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.get('token');
    const ip = req.ip;
    const text = req.body.text;
    await postMessageReply(text, messageId, userId, ip);
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error sending reply' });
  }
};

const handleUpvoteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedDownvote = await removeDownvoteFromReply(replyId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    const addedUpvote = await upvoteReply(replyId, userId);
    if (addedUpvote) {
      await incrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when upvoting reply' });
  }
};

const handleDownvoteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedUpvote = await removeUpvoteFromReply(replyId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    const addedDownvote = await downvoteReply(replyId, userId);
    if (addedDownvote) {
      await decrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when downvoting reply' });
  }
};

const handleRemoveDownvoteFromReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedDownvote = await removeDownvoteFromReply(replyId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing downvote from reply' });
  }
};

const handleRemoveUpvoteFromReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = await getReplyAuthorId(replyId);
    const removedUpvote = await removeUpvoteFromReply(replyId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing upvote from reply' });
  }
};

const handleDeleteReply = async (req, res) => {
  try {
    const userId = req.get('token');
    const replyId = req.params.id;
    const authorId = getReplyAuthorId(replyId);
    if (userId != authorId) {
      throw new Error(
        'Unable to delete a reply that you are not the author of'
      );
    }
    const deleted = deleteReply(replyId);
    res.json({ message: 'OK' });
  } catch (error) {}
  res
    .status(500)
    .json({ message: 'Server error when attempting to delete reply' });
};

module.exports = {
  handleGetMessageReplies,
  handlePostReplyToMessage,
  handleDownvoteReply,
  handleUpvoteReply,
  handleDeleteReply,
  handleRemoveUpvoteFromReply
};
