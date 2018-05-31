# Server Tests

## Client requests

* [ ] Post message
* [ ] Load a message
* [ ] Register user
* [ ] Post reply
* [ ] Upvote message
* [ ] Downvote message
* [ ] Get user messages
* [ ] Get messages user replied to
* [ ] Load a reply
* [ ] Load new messages feed
* [ ] Load top messages feed
* [ ] Load replies to message
* [ ] Load older messages from 'new' feed
* [ ] Load older messages from 'top' feed

### Database tasks

#### User

* [ ] add user
* [ ] get user message id's
* [ ] get user reply id's
* [ ] get message id's of messages user replied to
* [ ] sending message updates user message list
* [ ] db accurately states if user voted on message
* [ ] db accurately states if user voted on reply
* [ ] db accurately states if user is author

#### Messages

* [ ] add a message to db
* [ ] get message data from db
* [ ] add upvote to message
* [ ] add downvote
* [ ] accurately states score
* [ ] replying to message updates reply list of ids
* [ ] accurately gets reply id list
* [ ] accurately gets message data from id list

#### Replies

* [ ] accurately gets reply data from id list
* [ ] add upvote updates upvoter set and score
* [ ] add downvote updates downvoter set and score
* [ ] accurately checks author
* [ ] shows if user upvoted and downvoted
* [ ] gets accurate score
* [ ] gets correct id of parent message
