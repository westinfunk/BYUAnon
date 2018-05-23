import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class MessageView extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text style={Styles.text}>{this.props.text}</Text>
          </View>
          <View style={Styles.scoreArea}>
            <Text style={Styles.score}>{this.props.score}</Text>
          </View>
        </View>
        <View style={Styles.info}>
          <View style={Styles.timestampArea} />
          <View style={Styles.replyCountArea} />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    minHeight: 120,
    backgroundColor: '#CCCCCC',
    flex: 1
  },
  messageText: {
    fontSize: 28
  }
});
