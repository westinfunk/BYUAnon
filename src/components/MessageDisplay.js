import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MessageScoreBox from './MessageScoreBox';
import TimeDisplay from './TimeDisplay';
import { DARK_GRAY, DROP_SHADOW } from '../styles';

export default class MessageDisplay extends Component {
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
    padding: 20,
    ...DROP_SHADOW
  },
  body: { flex: 1 },
  textArea: { minHeight: 80 },
  // textArea: { minHeight: 160 },
  text: {
    color: DARK_GRAY,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20
  },
  information: {
    flexDirection: 'row',
    padding: 5,
    alignSelf: 'flex-end'
  }
});
