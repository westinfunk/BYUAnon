const { encode, decode, fillZeros } = require('../utils');
const client = require('../db');

const handleRegisterUser = async function(req, res) {
  console.log('inside register user handler');
  try {
    await client.incr('usernumber');
    const userNumber = await client.get('usernumber');
    const userId = 'U' + fillZeros(userNumber);
    res.json({ token: userId });
  } catch (error) {
    console.log(error, new Date());
  }
};

// const handleGetUserMessages = async function(req, res) {
//   const userId = decode(req.params.token);
//   const
// };

// const handleGetUserReplies = async function() {
//   //
// };

// module.exports = {
//   handleRegisterUser,
//   handleGetUserMessages,
//   handleGetUserReplies
// };

module.exports = {
  handleRegisterUser
};
