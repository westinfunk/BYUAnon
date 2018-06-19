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

  async upvoteMessage() {
    const { id } = this.props;
    try {
      const upvoteMessage = await post(`/message/${id}/upvote`);
      return upvoteMessage;
    } catch (error) {
      console.error('Unable to upvote message', error);
    }
  }

  async downvoteMessage() {
    const { id } = this.props;
    try {
      const downvoteMessage = await post(`/message/${id}/downvote`);
      return downvoteMessage;
    } catch (error) {
      console.error('Unable to downvote message', error);
    }
  }

  async removeVote() {
    const { id } = this.props;
    try {
      const removedVote = await post(`message/${id}/removeVote`);
      return removedVote;
    } catch (error) {
      console.error('Unable to remove vote');
    }
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
        removeVote={this.removeVote}
      />
    );
  }
}

MessageScoreBox.propTypes = propTypes;
