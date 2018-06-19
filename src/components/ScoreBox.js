import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import UpvoteSelectedIcon from '../icons/UpvoteSelectedIcon';
import UpvoteUnselectedIcon from '../icons/UpvoteUnselectedIcon';
import DownvoteSelectedIcon from '../icons/DownvoteSelectedIcon';
import DownvoteUnselectedIcon from '../icons/DownvoteUnselectedIcon';
import { PRIMARY } from '../styles';

const propTypes = {
  vote: PropTypes.string,
  score: PropTypes.number,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  removeVote: PropTypes.func.isRequired
};

const defaultProps = {
  vote: null,
  score: 0
};

export default class ScoreBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: null,
      score: 0
    };
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

  handleUpvoteButtonPress() {
    if (this.state.vote == 'up') {
      this.setState((prevState) => {
        return {
          vote: null,
          score: prevState.score - 1
        };
      });
      this.props.removeVote();
    } else if (this.state.vote == 'down') {
      this.setState((prevState) => {
        return {
          vote: 'up',
          score: prevState.score + 2
        };
      });
      this.props.upvote();
    } else {
      this.setState((prevState) => {
        return {
          vote: 'up',
          score: prevState.score + 1
        };
      });
      this.props.upvote();
    }
  }

  handleDownvoteButtonPress() {
    if (this.state.vote == 'down') {
      this.setState((prevState) => {
        return {
          vote: null,
          score: prevState.score + 1
        };
      });
      this.props.removeVote();
    } else if (this.state.vote == 'up') {
      this.setState((prevState) => {
        return {
          vote: 'down',
          score: prevState.score - 2
        };
      });
      this.props.downvote();
    } else {
      this.setState((prevState) => {
        return {
          vote: 'down',
          score: prevState.score - 1
        };
      });
      this.props.downvote();
    }
  }

  renderUpvoteIcon() {
    return this.state.vote == 'up' ? (
      <UpvoteSelectedIcon />
    ) : (
      <UpvoteUnselectedIcon />
    );
  }

  renderDownvoteIcon() {
    return this.state.vote == 'down' ? (
      <DownvoteSelectedIcon />
    ) : (
      <DownvoteUnselectedIcon />
    );
  }

  render() {
    const upvoteIcon = this.renderUpvoteIcon();
    const downvoteIcon = this.renderDownvoteIcon();
    const score = this.state.score;

    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={this.handleUpvoteButtonPress.bind(this)}>
          <View style={Styles.upvote}>{upvoteIcon}</View>
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <View style={Styles.score}>
            <Text style={Styles.scoreText}>{score}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={this.handleDownvoteButtonPress.bind(this)}
          style={Styles.downvote}>
          <View style={Styles.downvote}>{downvoteIcon}</View>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    padding: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: PRIMARY
  }
});

ScoreBox.propTypes = propTypes;
ScoreBox.defaultProps = defaultProps;
