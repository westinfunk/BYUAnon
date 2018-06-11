import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import { PRIMARY, DARK_GRAY, LIGHT_GRAY, DROP_SHADOW } from '../styles';
import DeleteButton from '../components/DeleteButton';
import TimeDisplay from '../components/TimeDisplay';
import PropTypes from 'prop-types';

const propTypes = {
  scorebox: PropTypes.element.isRequired,
  timestamp: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  vote: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onNavigate: PropTypes.func,
  replyCount: PropTypes.number
};

export default class FeedItem extends Component {
  componentDidMount() {
    console.log('THIS FEED ITEM MOUNTED', this.props);
  }

  renderReplyCount() {
    const { replyCount } = this.props;
    return replyCount ? replyCount + ' replies' : '';
  }

  render() {
    const {
      ScoreBox,
      timestamp,
      onNavigate,
      onDelete,
      isAuthor,
      vote,
      score,
      id
    } = this.props;
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
      <TouchableHighlight onPress={onNavigate}>
        <View style={Styles.container}>
          <View style={Styles.body}>
            <View style={Styles.textArea}>
              <Text style={Styles.messageText}>{texts[randNum]}</Text>
            </View>
            <View style={Styles.information}>
              <TimeDisplay timestamp={timestamp} />
              <View style={Styles.replyCount}>
                <Text style={Styles.replyText}>{this.renderReplyCount()}</Text>
              </View>
              <DeleteButton display={isAuthor} onDelete={onDelete} />
            </View>
          </View>
          <ScoreBox vote={vote} score={score} id={id} />
        </View>
      </TouchableHighlight>
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  body: {
    flex: 1
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
  messageText: {
    fontSize: 17,
    color: DARK_GRAY,
    fontFamily: 'Nunito-SemiBold'
  },
  replyText: {
    color: LIGHT_GRAY,
    fontFamily: 'Nunito-Black',
    fontSize: 15
  }
});
