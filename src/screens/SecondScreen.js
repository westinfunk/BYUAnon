import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Second extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Text>Second</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigator.push({
              screen: 'Pushed',
              title: 'Pushed Screen'
            });
          }}
        >
          <Text>Push</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
