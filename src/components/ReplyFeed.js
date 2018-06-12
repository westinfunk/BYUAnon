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
import { PRIMARY } from '../styles';
import ListSeparator from './ListSeparator';

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
    if (this.props.replyCount) {
      this.getReplies();
    }
  }

  async getReplies() {
    const { messageId } = this.props;
    try {
      this.setState({ refreshing: true });
      const replies = await get(`/message/${messageId}/reply`);
      this.setState({ replies, refreshing: false, errorMessage: '' });
    } catch (error) {
      this.setState({
        refreshing: false,
        errorMessage: 'There was an error loading message replies'
      });
    }
  }

  renderItem(reply, index) {
    if (index == 0) {
      return (
        <View style={{ backgroundColor: '#fff' }}>
          {' '}
          <Text
            style={{
              color: PRIMARY,
              padding: 15,
              fontSize: 24,
              marginTop: 15,
              fontFamily: 'Nunito-ExtraBold'
            }}>
            Replies:
          </Text>
          <ReplyFeedItem {...reply.item} />
        </View>
      );
    } else {
      return <ReplyFeedItem {...reply.item} />;
    }
  }

  renderHeader() {
    return (
      <Text
        style={{
          color: PRIMARY,
          padding: 8,
          fontSize: 24,
          marginTop: 15,
          fontFamily: 'Nunito-ExtraBold'
        }}>
        Replies:
      </Text>
    );
  }

  render() {
    const { replies, refreshing } = this.state;
    return (
      <FlatList
        data={replies}
        renderItem={this.renderItem}
        refreshing={refreshing}
        onRefresh={this.getReplies.bind(this)}
        keyExtractor={(reply) => reply.id}
        ItemSeparatorComponent={ListSeparator}
        // ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

ReplyFeed.propTypes = propTypes;
