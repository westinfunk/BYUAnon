import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { registerDevice, get, getUserScore, updateUserScore } from '../utils';
import { PRIMARY, BACKGROUND_GRAY } from '../styles';
import MessageFeed from '../components/MessageFeed';

export default class UserMessages extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'compose',
        //icon: require('../../assets/compose.png'),
        systemItem: 'compose'
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    registerDevice();
    updateUserScore.bind(this)();
  }

  async getMessages() {
    return await get('/feed/new');
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={Styles.container}>
        <MessageFeed
          getMessages={this.getMessages}
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
