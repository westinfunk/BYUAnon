import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from 'react-native';
import RepliesFeedItem from './RepliesFeedItem';

export default class RepliesFeed extends Component {
  render() {
    return (
      <FlatList
        data={this.props.replies}
        renderItem={({ item, index }) => <RepliesFeedItem {...item} />}
      />
    );
  }
}
