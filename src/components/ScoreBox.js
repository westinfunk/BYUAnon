import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import UpvoteSelectedIcon from '../icons/UpvoteSelectedIcon';
import UpvoteUnselectedIcon from '../icons/UpvoteUnselectedIcon';
import DownvoteSelectedIcon from '../icons/DownvoteSelectedIcon';
import DownvoteUnselectedIcon from '../icons/DownvoteUnselectedIcon';
import { PRIMARY } from '../styles';

const propTypes = {
  vote: PropTypes.string,
  score: PropTypes.number.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onRemoveUpvote: PropTypes.func.isRequired,
  onRemoveDownvote: PropTypes.func.isRequired
};

const defaultProps = {
  vote: null,
  score: 0
};

export default class ScoreBox extends Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.vote !== prevState.vote ||
      nextProps.score !== prevState.score
    ) {
      return { vote: nextProps.vote, score: nextProps.score };
    } else {
      return null;
    }
  }

  renderUpvoteIcon() {
    if (this.state.vote == 'up') {
      return <UpvoteSelectedIcon />;
    } else {
      return <UpvoteUnselectedIcon />;
    }
  }

  renderDownvoteIcon() {
    if (this.state.vote == 'down') {
      return <DownvoteSelectedIcon />;
    } else {
      return <DownvoteUnselectedIcon />;
    }
  }

  render() {
    const upvoteIcon = this.renderUpvoteIcon();
    const downvoteIcon = this.renderDownvoteIcon();

    return (
      <View style={Styles.container}>
        <View style={Styles.upvote}>{upvoteIcon}</View>
        <View style={Styles.score}>
          <Text style={Styles.scoreText}>{this.state.score}</Text>
        </View>
        <View style={Styles.downvote}>{downvoteIcon}</View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    padding: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: PRIMARY
  },
  score: {},
  upvote: {},
  downvote: {}
});
