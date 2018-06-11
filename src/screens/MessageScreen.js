import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import MessageDisplay from '../components/MessageDisplay';
import ReplyFeed from '../components/ReplyFeed';
import { BACKGROUND_GRAY } from '../styles';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const messageId = this.props.id;
    return (
      <View style={Styles.container}>
        <MessageDisplay {...this.props} />
        <ReplyFeed replyCount={this.props.replyCount} messageId={messageId} />
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

const getReplies = async function() {
  await setTimeout(500);
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
