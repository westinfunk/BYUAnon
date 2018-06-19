import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LargeTextInput from '../components/LargeTextInput';
import { BACKGROUND_GRAY } from '../styles';
import { post } from '../utils';

export default class ComposeReply extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'cancel') {
        this.props.navigator.dismissModal();
      }
    }
  }

  async handleSubmitReply() {
    try {
      const text = this.state.text;
      const { messageId, reloadReplies } = this.props;
      console.log('reply text', text);
      console.log('message id', messageId);
      if (!text) {
        alert('butt');
        return;
      }
      this.setState({ loading: true });
      const response = await post(`/message/${messageId}/reply`, { text });
      await reloadReplies();
      console.log('response', response);
      if (response) {
        this.setState({ loading: false });
        this.props.navigator.dismissModal();
      }
    } catch (error) {
      this.setState({ loading: false, errorMessage: error.message });
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <LargeTextInput {...this.props} onSubmit={this.handleSubmitReply} />
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
