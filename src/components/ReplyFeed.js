import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import ReplyFeedItem from './ReplyFeedItem';
import { get } from '../utils';

const propTypes = {
  messageId: PropTypes.string.isRequired
};

export default class ReplyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      errorMessage: '',
      refreshing: false
    };
  }

  componentDidMount() {
    this.getReplies();
  }

  async getReplies() {
    const { messageId } = this.props;
    try {
      this.setState({ refreshing: true });
      const replies = await get(`/message/${messageId}/reply`);
      console.log('replies are', replies);
      this.setState({ replies, refreshing: false });
    } catch (error) {
      console.log('error gettings replies', error);
      this.setState({
        refreshing: false,
        errorMessage: 'There was an error loading message replies'
      });
    }
  }

  render() {
    const { replies, refreshing } = this.state;
    return (
      <FlatList
        data={replies}
        renderItem={(reply) => <ReplyFeedItem reply={reply} />}
        refreshing={refreshing}
        onRefresh={this.getReplies.bind(this)}
        keyExtractor={(reply) => reply.id}
      />
    );
  }
}

ReplyFeed.propTypes = propTypes;
