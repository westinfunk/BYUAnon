import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class TopMessages extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'compose',
        systemItem: 'compose'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  render() {
    return (
      <View style={Styles.container}>
        <Text>Top Messages</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
