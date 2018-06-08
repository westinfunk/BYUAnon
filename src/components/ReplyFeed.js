import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from 'react-native';
import ReplyFeedItem from './ReplyFeedItem';

export default class ReplyFeed extends Component {
  render() {
    return (
      <FlatList
        data={this.props.replies}
        renderItem={({ item, index }) => <ReplyFeedItem {...item} />}
      />
    );
  }
}
