import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { registerDevice, get, getUserScore } from '../Utils';
import { PRIMARY, WHITE } from '../styles';

export default class NewMessages extends Component {
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
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    registerDevice();
    this._getNewFeed();
    this._updateUserScore();
  }

  async _getNewFeed() {
    try {
      const messages = await get('/feed/new');
      console.log('loaded', messages);
      this.setState({ messages });
    } catch (error) {
      console.log('ERROR', error);
      this.setState({ error: 'error getting new feed' });
    }
  }

  async _updateUserScore() {
    console.log('lets find this out');
    const user = await getUserScore();
    console.log('this score is', user.score);
    if (user.score) {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            title: '' + user.score
          }
        ]
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress' && event.id == 'compose') {
      this.props.navigator.push({
        screen: 'ComposeMessage',
        title: 'Compose',
        backButtonTitle: 'Feed'
      });
    }
  }

  navigateToReplies(messageData) {
    this.props.navigator.push({
      screen: 'Message',
      title: 'Details',
      backButtonTitle: '',
      passProps: messageData
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Feed
          messages={this.state.messages}
          navigateToReplies={this.navigateToReplies.bind(this)}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
