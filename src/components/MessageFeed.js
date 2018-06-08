import React, { Component } from 'react';
import Feed from './Feed';
import MessageFeedItem from './MessageFeedItem';

export default class MessageFeed extends Component {
  //re-do this. Do not inherit from feed, make your own feed separate from reply feed in here

  render() {
    <Feed {...this.props} item={MessageFeedItem} />;
  }
}
