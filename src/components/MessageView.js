import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import ScoreBox from '../components/ScoreBox';

export default class MessageView extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text style={Styles.text}>{this.props.text}</Text>
          </View>
          <View style={Styles.scoreArea}>
            <ScoreBox
              vote={this.props.vote}
              score={this.props.score}
              id={this.props.id}
            />
          </View>
        </View>
        <View style={Styles.info}>
          <View style={Styles.timestampArea}>
            <Text>1 hr</Text>
          </View>
          <View style={Styles.replyCountArea}>
            <Text>3 Replies</Text>
          </View>
          <View style={Styles.extraButtonArea}>
            <Text>Report</Text>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    minHeight: 150,
    backgroundColor: '#CCCCCC',
    padding: 10
  },
  body: {
    flex: 1,
    flexDirection: 'row'
  },
  textArea: {
    flex: 1
  },
  messageText: {
    fontSize: 28
  },
  info: {
    height: 20,
    backgroundColor: '#BBBBBB',
    flexDirection: 'row',
    marginTop: 20
  },
  timestampArea: {
    flex: 1
  },
  replyCountArea: {
    flex: 1,
    alignItems: 'flex-start'
  },
  extraButtonArea: {
    //same width as scorebox
    width: 60,
    alignItems: 'center'
  }
});
