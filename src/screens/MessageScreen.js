import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ReplyFeed from '../components/ReplyFeed';
import { BACKGROUND_GRAY } from '../styles';

export default class Message extends Component {
  render() {
    const messageId = this.props.id;
    return (
      <View style={Styles.container}>
        <ReplyFeed {...this.props} messageId={messageId} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GRAY
  }
});
