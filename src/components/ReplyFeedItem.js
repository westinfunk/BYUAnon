import React, { Component } from 'react';
import FeedItem from './FeedItem';
import ReplyScoreBox from './ReplyScoreBox';

export default class MessageFeedItem extends Component {
  constructor(props) {
    super(props);
  }

  deleteMessage() {
    //
  }

  render() {
    return <FeedItem scorebox={ReplyScoreBox} onDelete={this.deleteMessage} />;
  }
}
