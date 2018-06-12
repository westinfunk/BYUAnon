import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import MessageFeed from '../components/MessageFeed';
import { get, registerDevice, updateUserScore } from '../utils';
import { BACKGROUND_GRAY } from '../styles';
import { registerScreens } from '.';

export default class TopMessages extends Component {
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
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress' && event.id == 'compose') {
      this.props.navigator.push({
        screen: 'ComposeMessage',
        title: 'Compose',
        backButtonTitle: ''
      });
    }
  }

  async getMessages() {
    updateUserScore.call(this);
    return await get('/feed/top');
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={Styles.container}>
        <MessageFeed
          getMessages={this.getMessages}
          getOlderMessages={() => alert('getting older messages')}
          navigator={navigator}
          parent={this}
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
