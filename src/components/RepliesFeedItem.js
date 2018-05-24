import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import ScoreBox from '../components/ScoreBox';

export default class RepliesFeedItem extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text>{this.props.text}</Text>
          </View>
          <ScoreBox />
        </View>
        <View style={Styles.dateArea}>
          <Text style={Styles.date}>"2d"</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {}
});
