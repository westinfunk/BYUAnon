import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

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

  upvote() {
    //TODO: put http calls in here
    this.setState(prevState => {
      if (prevState.vote == 'up') {
        return {
          vote: null,
          score: prevState.score - 1
        };
      } else if (prevState.vote == 'down') {
        return {
          vote: 'up',
          score: prevState.score + 2
        };
      } else {
        return {
          vote: 'up',
          score: prevState.score + 1
        };
      }
    });
  }

  downvote() {
    //TODO: put http calls in here
    this.setState(prevState => {
      if (prevState.vote == 'down') {
        return {
          vote: null,
          score: prevState.score + 1
        };
      } else if (prevState.vote == 'up') {
        return {
          vote: 'down',
          score: prevState.score - 2
        };
      } else {
        return {
          vote: 'down',
          score: prevState.score - 1
        };
      }
    });
  }

  render() {
    const upvoteButton = this.state.vote == 'up' ? '^^^^' : '^';
    const downvoteButton = this.state.vote == 'down' ? 'vvvv' : 'v';

    return (
      <View style={Styles.container}>
        <TouchableHighlight
          style={Styles.upvote}
          onPress={this.upvote.bind(this)}
        >
          <Text>{upvoteButton}</Text>
        </TouchableHighlight>
        <View style={Styles.score}>
          <Text>{this.state.score}</Text>
        </View>
        <TouchableHighlight
          style={Styles.downvote}
          onPress={this.downvote.bind(this)}
        >
          <Text>{downvoteButton}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  },
  upvote: {
    backgroundColor: '#CCCCCC'
  },
  downvote: {
    backgroundColor: '#EEEEEE'
  }
});
