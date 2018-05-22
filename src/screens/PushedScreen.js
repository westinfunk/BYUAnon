import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Pushed extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Text>Pushed</Text>
      </View>
    );
  }
}
