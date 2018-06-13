import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ReplyFeedItem from './ReplyFeedItem';
import { get } from '../utils';
import { PRIMARY } from '../styles';
import ListSeparator from './ListSeparator';
import MessageDisplay from './MessageDisplay';
import Separator from './Separator';

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

  renderHeadMessage() {
    return <MessageDisplay {...this.props} />;
  }

  renderSeparator() {
    return <Separator height={3} width={'95%'} align={'right'} />;
  }

  renderItem(reply) {
    if (reply.index == 0) {
      return (
        <View style={{ backgroundColor: '#fff', marginTop: 18 }}>
          <Text
            style={{
              color: PRIMARY,
              paddingHorizontal: 15,
              paddingVertical: 10,
              fontSize: 24,
              fontFamily: 'Nunito-ExtraBold'
            }}>
            Replies:
          </Text>
          {this.renderSeparator()}
          <ReplyFeedItem {...reply.item} />
        </View>
      );
    } else {
      return <ReplyFeedItem {...reply.item} />;
    }
  }

  render() {
    const { replies, refreshing } = this.state;
    return (
      <FlatList
        data={replies}
        renderItem={this.renderItem.bind(this)}
        refreshing={refreshing}
        onRefresh={this.getReplies.bind(this)}
        keyExtractor={(reply) => reply.id}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeadMessage.bind(this)}
      />
    );
  }
}

ReplyFeed.propTypes = propTypes;
