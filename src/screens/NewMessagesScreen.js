import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { registerDevice, get, getUserScore } from '../utils';
import { PRIMARY } from '../styles';
import MessageFeed from '../components/MessageFeed';

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
  }

  componentDidMount() {
    registerDevice();
    //this._getNewFeed();
    this._updateUserScore();
  }

  // async _getNewFeed() {
  //   try {
  //     const messages = await get('/feed/new');
  //     console.log('loaded', messages);
  //     this.setState({ messages });
  //   } catch (error) {
  //     console.log('ERROR', error);
  //     this.setState({ error: 'error getting new feed' });
  //   }
  // }

  async _updateUserScore() {
    try {
      const user = await getUserScore();
      if (user.score) {
        this.props.navigator.setButtons({
          leftButtons: [
            {
              title: '' + user.score
            }
          ]
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    return await get('/feed/new');
  }

  // navigateToReplies(messageData) {
  //   this.props.navigator.push({
  //     screen: 'Message',
  //     title: 'Details',
  //     backButtonTitle: '',
  //     passProps: messageData
  //   });
  // }

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

{
  /* <Feed navigator={this.props.navigator} messages={this.state.messages} /> */
}
const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
