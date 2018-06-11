import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ScoreBox from './ScoreBox';
import { post } from '../utils';

const propTypes = {
  vote: PropTypes.string,
  score: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default class MessageScoreBox extends Component {
  constructor(props) {
    super(props);
    this.upvoteMessage = this.upvoteMessage.bind(this);
    this.downvoteMessage = this.downvoteMessage.bind(this);
    this.removeUpvoteFromMessage = this.removeUpvoteFromMessage.bind(this);
    this.removeDownvoteFromMessage = this.removeDownvoteFromMessage.bind(this);
  }

  upvoteMessage() {
    //
  }

  downvoteMessage() {
    //
  }

  removeUpvoteFromMessage() {
    //
  }

  removeDownvoteFromMessage() {
    //
  }

  render() {
    return (
      <ScoreBox
        {...this.props}
        upvote={this.upvoteMessage}
        downvote={this.downvoteMessage}
        removeUpvote={this.removeUpvoteFromMessage}
        removeDownvote={this.removeDownvoteFromMessage}
      />
    );
  }
}

MessageScoreBox.propTypes = propTypes;
