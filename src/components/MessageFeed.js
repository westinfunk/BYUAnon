import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MessageFeedItem from './MessageFeedItem';
import ListSeparator from '../components/ListSeparator';
import PropTypes from 'prop-types';
import Separator from './Separator';

const propTypes = {
  getMessages: PropTypes.func.isRequired,
  getOlderMessages: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired
};

export default class MessageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      messages: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    this.handleLoadMessages();
  }

  async handleLoadMessages() {
    try {
      this.setState({ refreshing: true });
      const messages = await this.props.getMessages();
      console.log('loaded message feed, here are the messages', messages);
      this.setState({ refreshing: false, errorMessage: '', messages });
    } catch (error) {
      this.setState({
        refreshing: false,
        errorMessage: 'There was a problem retrieving posts'
      });
    }
  }

  render() {
    const { messages, refreshing } = this.state;
    const { getOlderMessages, navigator } = this.props;
    return (
      <FlatList
        data={messages}
        renderItem={(message) => (
          <MessageFeedItem {...message.item} navigator={navigator} />
        )}
        keyExtractor={(message) => message.id}
        ItemSeparatorComponent={ListSeparator}
        refreshing={refreshing}
        onRefresh={this.handleLoadMessages.bind(this)}
      />
    );
  }
}

MessageFeed.propTypes = propTypes;
