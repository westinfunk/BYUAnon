import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LargeTextInput from '../components/LargeTextInput';
import { BACKGROUND_GRAY } from '../styles';

export default class ComposeMessage extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
  }

  handleSubmitMessage() {
    const text = this.state.text;
  }

  render() {
    return (
      <View style={Styles.container}>
        <LargeTextInput onSubmit={this.handleSubmitMessage} />
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
