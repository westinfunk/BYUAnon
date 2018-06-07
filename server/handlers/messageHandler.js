const {
  incrementUserScore,
  decrementUserScore
} = require('../models/userModel');
const {
  upvoteMessage,
  downvoteMessage,
  removeUpvoteFromMessage,
  removeDownvoteFromMessage,
  getMessageAuthorId,
  postMessage,
  deleteMessage
} = require('../models/messageModel');

const handlePostMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageText = req.body.text;
    const ip = req.ip;
    await postMessage(messageText, userId, ip);
    res.json({ message: 'OK' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error when trying to post message' });
  }
  //
};

const handleUpvoteMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageId = req.params.id;
    const authorId = await getMessageAuthorId(messageId);
    const removedDownvote = await removeDownvoteFromMessage(messageId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    const addedUpvote = await upvoteMessage(messageId, userId);
    if (addedUpvote) {
      await incrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when upvoting message' });
  }
};

const handleDownvoteMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageId = req.params.id;
    const authorId = await getMessageAuthorId(messageId);
    const removedUpvote = await removeUpvoteFromMessage(messageId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    const addedDownvote = await downvoteMessage(messageId, userId);
    if (addedDownvote) {
      await decrementUserScore(authorId);
    }
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Server error when downvoting message' });
  }
};

const handleRemoveDownvoteFromMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageId = req.params.id;
    const authorId = await getMessageAuthorId(messageId);
    const removedDownvote = await removeDownvoteFromMessage(messageId, userId);
    if (removedDownvote) {
      await incrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing downvote from message' });
  }
};

const handleRemoveUpvoteFromMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageId = req.params.id;
    const authorId = await getMessageAuthorId(messageId);
    const removedUpvote = await removeUpvoteFromMessage(messageId, userId);
    if (removedUpvote) {
      await decrementUserScore(authorId);
    }
    res.send('OK');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error removing upvote from message' });
  }
};

const handleDeleteMessage = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageId = req.params.id;
    const authorId = getMessageAuthorId(replyId);
    if (userId != authorId) {
      throw new Error(
        'Unable to delete a message that you are not the author of'
      );
    }
    const deleted = deleteMessage(messageId);
    res.json({ message: 'OK' });
  } catch (error) {}
  res
    .status(500)
    .json({ message: 'Server error when attempting to delete message' });
};

module.exports = {
  handlePostMessage,
  handleUpvoteMessage,
  handleDownvoteMessage,
  handleDeleteMessage
};
