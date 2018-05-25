const handleError = (errorMessage) => {
  console.log(errorMessage, new Date());
};

module.exports = {
  handleError
};

// const _ = require('lodash');
// const assert = require('assert');
// const encoder = require('nodejs-base64-encode');

// const client = require('./db.js');

// const DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD = 10;
// const MAX_NUMBER_OF_ELEMENTS_TO_LOAD = 50;

// const getOlderElementIdsFromList = async function(
//   listId,
//   lastElementId,
//   numOfElements = DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD
// ) {
//   const mostRecentElementIds = await client.range(
//     listId,
//     0,
//     MAX_NUMBER_OF_ELEMENTS_TO_LOAD
//   );
//   const startIndex = _.indexOf(mostRecentElementIds) + 1;
//   const endingIndex = startIndex + DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD - 1;
//   return _.slice(mostRecentElementIds, startIndex, endingIndex);
// };

// const getNewestElementIdsFromList = async function(
//   listId,
//   lastElementId,
//   numOfElements = DEFAULT_NUMBER_OF_ELEMENTS_TO_LOAD
// ) {
//   /*
//     >Gets 10 newest elements from the list specified by listId
//     >Checks which elements are new based on the given last-seen element id
//     >Returns array of only the new element ids
//     >Returns all 10 elements retrieved from db if the last-seen element id does not exist inside it
//   */
//   const topElementIds = await client.lrange(listId, 0);
//   const indexOfLastElementId = _.indexOf(topElementIds, lastElementId);
//   const necessaryIds =
//     indexOfLastElementId == -1
//       ? topElementIds
//       : _.slice(topElementIds, 0, indexOfLastElementId);
// };

// const getNewFeed = async function(userId, lastElementId) {
//   const messageIds = await getNewestElementIdsFromList('feed', lastElementId);
//   return await getMessageDataFromIds(messageIds, userId, 'messages:');
// };

// const getMessageDataFromIds = async function(ids, userId, prepend = '') {
//   /*
//     pulls full message/reply data from Redis for each message/reply id
//     returns an array of message/reply objects with appropriate data to send to client

//     FORMAT OF RETURNED MESSAGE/REPLY OBJECTS
//     {
//       id: string,
//       text: string,
//       isAuthor: bool,
//       score: int,
//       timestamp: string
//       vote: 'up' or 'down'
//     }
//     */
//   const messages = await ids.map(async id => {
//     let message = {};
//     const messageData = await client.get(prepend + id);
//     const upvoteCount = await client.scard(prepend + id + ':upvotes');
//     const downvoteCount = await client.scard(prepend + id + ':downvotes');
//     const userUpvoted = await client.ismember(prepend + id + ':upvotes');
//     const userDownvoted = await client.ismember(prepend + id + ':downvotes');
//     message.id = id;
//     message.text = messageData.text;
//     message.timestamp = messageData.timestamp;
//     message.score = upvoteCount - downvoteCount;
//     message.isAuthor = messageData.author = userId;
//     if (userUpvoted) {
//       message.vote = 'up';
//     } else if (userDownvoted) {
//       message.vote = 'down';
//     } else {
//       message.vote = null;
//     }
//     return message;
//   });
//   return messages;
// };

// module.exports = {
//   encode,
//   decode,
//   fillZeros,
//   getNewestElementIdsFromList
// };
