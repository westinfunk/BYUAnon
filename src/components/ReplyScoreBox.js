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

export default class ReplyScoreBox extends Component {
  constructor(props) {
    super(props);
    this.upvoteReply = this.upvoteReply.bind(this);
    this.downvoteReply = this.downvoteReply.bind(this);
    this.removeUpvoteFromReply = this.removeUpvoteFromReply.bind(this);
    this.removeDownvoteFromReply = this.removeDownvoteFromReply.bind(this);
  }

  upvoteReply() {
    //
  }

  downvoteReply() {
    //
  }

  removeUpvoteFromReply() {
    //
  }

  removeDownvoteFromReply() {
    //
  }

  render() {
    return (
      <ScoreBox
        {...this.props}
        upvote={this.upvoteReply}
        downvote={this.downvoteReply}
        removeUpvote={this.removeUpvoteFromReply}
        removeDownvote={this.removeDownvoteFromReply}
      />
    );
  }
}

ReplyScoreBox.propTypes = propTypes;
