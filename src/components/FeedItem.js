import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import UpvoteSelectedIcon from '../icons/UpvoteSelectedIcon';
import UpvoteUnselectedIcon from '../icons/UpvoteUnselectedIcon';
import DownvoteSelectedIcon from '../icons/DownvoteSelectedIcon';
import DownvoteUnselectedIcon from '../icons/DownvoteUnselectedIcon';
import ScoreBox from '../components/ScoreBox';
import { PRIMARY, DARK_GRAY, LIGHT_GRAY, DROP_SHADOW } from '../styles';
import TrashIcon from '../icons/TrashIcon';
import TimestampDisplay from '../components/TimestampDisplay';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
  }

  renderReplyCount() {
    const replyCount =
      typeof this.props.replyCount == 'string'
        ? parseInt(this.props.replyCount)
        : this.props.replyCount;
    return replyCount ? replyCount + ' replies' : '';
  }

  render() {
    const replyCount = this.renderReplyCount();
    const trash = this.props.isAuthor ? 'not' : 'trash';
    const longText =
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu odio porttitor arcu bibendum sagittis et ac erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur rient montes';
    const mediumText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu odio porttitor arcu bibendum sagittis et ac erat.';
    const shortText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const shortestText = 'Lorem ipsum dolor';
    const randNum = Math.floor(Math.random() * 4);
    const texts = [];
    texts.push(longText);
    texts.push(mediumText);
    texts.push(shortText);
    texts.push(shortestText);
    return (
      <View style={Styles.container}>
        <View style={Styles.body}>
          <View style={Styles.textArea}>
            <Text style={Styles.messageText}>{texts[randNum]}</Text>
          </View>
          <View style={Styles.information}>
            <TimestampDisplay timestamp={1528254558096} />
            <View style={Styles.replyCount}>
              <Text style={Styles.replyText}>3 replies</Text>
            </View>
            <View style={Styles.delete}>
              <TrashIcon />
            </View>
          </View>
        </View>
        <View style={Styles.scoreArea}>
          <View style={Styles.upvote}>
            <UpvoteSelectedIcon />
          </View>
          <View style={Styles.score}>
            <Text style={Styles.scoreText}>12</Text>
          </View>
          <View style={Styles.downvote}>
            <DownvoteUnselectedIcon />
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  body: {
    flex: 1
  },
  scoreArea: {
    marginLeft: 15,
    padding: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textArea: {
    flex: 1
  },
  information: {
    marginTop: 15,
    flexDirection: 'row'
  },
  replyCount: {
    flex: 1,
    alignItems: 'center'
  },
  delete: {
    flex: 1,
    alignItems: 'flex-end'
  },
  upvote: {},
  score: {},
  downvote: {},
  scoreText: {
    fontSize: 20,
    fontFamily: 'AvenirNext-Medium',
    color: PRIMARY
  },
  messageText: {
    fontSize: 18,
    color: DARK_GRAY,
    fontFamily: 'AvenirNext-Medium'
  },
  replyText: {
    fontFamily: 'AvenirNext-Bold',
    color: LIGHT_GRAY,
    fontSize: 16
  }
});
