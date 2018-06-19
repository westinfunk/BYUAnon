import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MessageScoreBox from './MessageScoreBox';
import TimeDisplay from './TimeDisplay';
import { DARK_GRAY, DROP_SHADOW, PRIMARY } from '../styles';
import { Icon } from 'react-native-elements';

export default class MessageDisplay extends Component {
  handleComposeReply() {
    const messageId = this.props.id;
    const { reloadReplies } = this.props;
    this.props.navigator.showModal({
      screen: 'ComposeReply',
      title: 'Reply',
      passProps: { messageId, reloadReplies },
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Cancel',
            id: 'cancel',
            buttonFontSize: 18
          }
        ]
      }
    });
  }

  render() {
    const { vote, score, id, timestamp, isAuthor, text } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text style={Styles.text}>{text}</Text>
          </View>
          <View style={Styles.information}>
            <TimeDisplay timestamp={timestamp} size={18} />
            <TouchableOpacity
              onPress={this.handleComposeReply.bind(this)}
              style={Styles.replyButton}>
              <Text style={Styles.replyButtonText}>
                {'Reply '}
                <Icon
                  name="reply"
                  type="font-awesome"
                  size={18}
                  color={PRIMARY}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <MessageScoreBox vote={vote} score={score} id={id} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 14,
    paddingHorizontal: 20,
    ...DROP_SHADOW
  },
  body: { flex: 1 },
  textArea: { minHeight: 80 },
  text: {
    color: DARK_GRAY,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20
  },
  information: {
    flexDirection: 'row',
    paddingTop: 12,
    alignSelf: 'flex-end'
  },
  replyButtonText: {
    flex: 1,
    fontFamily: 'Nunito-ExtraBold',
    color: PRIMARY,
    fontSize: 18
  }
});
