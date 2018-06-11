import React, { Component } from 'react';
import FeedItem from './FeedItem';
import ReplyScoreBox from './ReplyScoreBox';

export default class MessageFeedItem extends Component {
  constructor(props) {
    super(props);
  }

  deleteMessage() {
    alert('tryina delete reply');
  }

  render() {
    return (
      <FeedItem
        {...this.props}
        ScoreBox={ReplyScoreBox}
        onDelete={this.deleteMessage}
      />
    );
  }
}
