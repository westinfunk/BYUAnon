import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ScoreBox from './ScoreBox';
import { post } from '../Utils';

const propTypes = {
  vote: PropTypes.string,
  score: PropTypes.number.isRequired,
  messageId: PropTypes.string.isRequired
};

export default class MessageScoreBox extends Component {
  constructor(props) {
    super(props);
  }

  upvoteMessage() {
    alert('upvoting message', this.props.messageId);
  }

  downvoteMessage() {
    alert('downvoting message', this.props.messageId);
  }

  removeUpvoteFromMessage() {
    alert('removing upvote from message', this.props.messageId);
  }

  removeDownvoteFromMessage() {
    alert('removing downvote from message', this.props.messageId);
  }

  render() {
    return (
      <ScoreBox
        {...this.props}
        onUpvote={this.upvoteMessage}
        onDownvote={this.downvoteMessage}
        removeUpvoteFromMessage={this.removeUpvoteFromMessage}
        removeDownvoteFromMessage={this.removeDownvoteFromMessage}
      />
    );
  }
}
