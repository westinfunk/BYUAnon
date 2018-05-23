import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
  }

  renderTime() {
    return '1h';
  }

  renderReplyCount() {
    return '2 replies';
  }

  render() {
    const time = this.renderTime();
    const replyCount = this.renderReplyCount();

    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text>{this.props.text}</Text>
          </View>
          <View style={Styles.information}>
            <View style={Styles.dateArea}>
              <Text>{time}</Text>
            </View>
            <View style={Styles.replyCountArea}>
              <Text>{replyCount}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.score}>
          <TouchableHighlight>
            <Text>^</Text>
          </TouchableHighlight>
          <Text>{this.props.score}</Text>
          <TouchableHighlight>
            <Text>v</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 90,
    backgroundColor: '#FFFFFF',
    padding: 5
  },
  score: {
    width: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  },
  textArea: {
    flex: 1
  },
  information: {
    marginTop: 10,
    backgroundColor: '#95bcf9',
    flex: 1,
    flexDirection: 'row'
  },
  dateArea: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  replyCountArea: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});
