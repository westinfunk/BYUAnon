import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import MessageView from '../components/MessageView';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <View style={Styles.container}>
        <MessageView {...this.props} />
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const getReplies = async function() {
  await setTimeout(1000);
  return [
    {
      id: '1243560',
      text: 'this is reply number one',
      timestamp: '2018-05-23T23:40:28.288Z',
      score: 3,
      isOwner: false
    },
    {
      id: '1243561',
      text: 'this is reply number two',
      timestamp: '2018-05-23T23:37:28.288Z',
      score: 3,
      isOwner: false
    },
    {
      id: '1243562',
      text:
        'this is reply number three and it is really long alkjsd lalasf lkl kjl dkf lskj dlfkj slkdjf lksjdfla laskdjf laksjdl asdkj flkajs dfa',
      timestamp: '2018-05-23T23:31:28.288Z',
      score: 3,
      isOwner: false
    },
    {
      id: '1243563',
      text: 'this is reply number four',
      timestamp: '2018-05-23T21:40:28.288Z',
      score: 3,
      isOwner: false
    }
  ];
};
