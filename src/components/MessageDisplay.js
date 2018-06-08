import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MessageScoreBox from './MessageScoreBox';
import TimeDisplay from './TimeDisplay';

export default class MessageDisplay extends Component {
  render() {
    const { vote, score, id } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.text}>{this.props.text}</View>
          <View style={Styles.information}>
            <TimeDisplay timestamp={Date.now() - 20000} />
          </View>
        </View>
        <MessageScoreBox vote={vote} score={score} id={id} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: { minHeight: 240 },
  body: {},
  text: {},
  information: {}
});
