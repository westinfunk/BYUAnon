const {
  addNewUser,
  getUserMessageIds,
  getIdsOfMessagesUserRepliedTo,
  getUser,
  checkIfUserExists,
  getUserScore
} = require('../models/userModel');

const { getMessageDataFromIds } = require('../models/messageModel');

const handleRegisterUser = async (req, res) => {
  try {
    console.log('registering a new user!');
    const ip = req.ip;
    const userId = await addNewUser(ip);
    console.log('the user id given was', userId);
    res.json(userId);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error when trying to register user' });
  }
};

const handleGetUserMessages = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageIds = await getUserMessageIds(userId);
    const messages = await getMessageDataFromIds(messageIds);
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error when getting user messages' });
  }
};

const handleGetMessagesUserRepliedTo = async (req, res) => {
  try {
    const userId = req.get('token');
    const messageIds = await getIdsOfMessagesUserRepliedTo(userId);
    const messages = await getMessageDataFromIds(messageIds);
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error when getting messages user replied to' });
  }
};

const handleGetUserScore = async (req, res) => {
  try {
    const userId = req.get('token');
    console.log('look who it is its', userId);
    let score = await getUserScore(userId);
    if (isNaN(score)) {
      const userExists = await checkIfUserExists(userId);
      if (!userExists) {
        await addNewUser(req.ip, userId);
      }
      score = 100;
    }
    res.send(JSON.stringify(score));
  } catch (error) {
    res.status(500).json({ message: 'Server error getting user score' });
  }
};

module.exports = {
  handleRegisterUser,
  handleGetUserMessages,
  handleGetMessagesUserRepliedTo,
  handleGetUserScore
};
