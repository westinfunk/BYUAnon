const {
  addNewUser,
  getUserMessageIds,
  getIdsOfMessagesUserRepliedTo,
  getUser,
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
    return messages;
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
    return messages;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error when getting messages user replied to' });
  }
};

// const handleGetUserInfo = async (req, res) => {
//   try {
//     const userId = req.get('token');
//     const userData = await getUser(userId);
//     const { score } = userData;
//     res.json({ score });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error getting that user' });
//   }
// };

const handleGetUserScore = async (req, res) => {
  try {
    const userId = req.get('token');
    console.log('look who it is its', userId);
    const score = await getUserScore(userId);
    res.json({ score });
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
