import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MessageFeed from '../components/MessageFeed';
import { registerDevice, get, updateUserScore } from '../utils';
import { BACKGROUND_GRAY } from '../styles';

export default class NewMessages extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'compose',

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
    return await get('/feed/new');
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
