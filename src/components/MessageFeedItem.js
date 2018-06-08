import React, { Component } from 'react';
import FeedItem from './FeedItem';
import MessageScoreBox from './MessageScoreBox';
import { fetchDelete } from '../Utils';
import PropTypes from 'prop-types';

const propTypes = {
  navigator: PropTypes.object.isRequired
};

export default class MessageFeedItem extends Component {
  constructor(props) {
    super(props);
  }

  navigateToMessage() {
    const { navigator, ...messageProps } = this.props;
    this.props.navigator.push({
      screen: 'Message',
      title: 'Details',
      backButton: '',
      passProps: messageProps
    });
  }

  deleteMessage() {
    alert('tryina delete');
  }

  render() {
    return (
      <FeedItem
        {...this.props}
        onNavigate={this.navigateToMessage.bind(this)}
        ScoreBox={MessageScoreBox}
        onDelete={this.deleteMessage}
      />
    );
  }
}
