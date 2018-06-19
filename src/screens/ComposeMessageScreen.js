import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LargeTextInput from '../components/LargeTextInput';
import { BACKGROUND_GRAY } from '../styles';
import { post } from '../utils';

export default class ComposeMessage extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
  }

  async handleSubmitMessage() {
    try {
      const text = this.state.text;
      if (!text) {
        return;
      }
      this.setState({ loading: true });
      const response = await post('/message', { text });
      if (response) {
        this.setState({ loading: false });
        this.props.navigator.popToRoot({
          animated: true
        });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <LargeTextInput
          onSubmit={this.handleSubmitMessage}
          navigator={this.props.navigator}
        />
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
