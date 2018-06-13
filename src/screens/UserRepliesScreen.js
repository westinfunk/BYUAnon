import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { registerDevice, get, updateUserScore } from '../utils';
import { BACKGROUND_GRAY } from '../styles';
import MessageFeed from '../components/MessageFeed';

export default class UserMessages extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'compose',

        systemItem: 'compose'
      }
    ]
  };

  async getMessages() {
    return await get('/user/reply');
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={Styles.container}>
        <MessageFeed
          getMessages={this.getMessages.bind(this)}
          getOlderMessages={() => alert('getting older messages')}
          navigator={navigator}
        />
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
