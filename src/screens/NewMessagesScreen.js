import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { registerDevice } from '../Utils';

export default class NewMessages extends Component {
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

  componentDidMount() {
    registerDevice();
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
        <Feed messages={messages} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const messages = [
  {
    text: 'okay man',
    score: 13,
    key: '1'
  },
  {
    text:
      'asdfjj alskdj laskdj a;lkdsv ;lvkjads; kldf;jlvas kads;jdfa ;lkasdjldfsa',
    score: 1,
    key: '2'
  },
  {
    text:
      'fjal;skj;vlk c,.mds dsfj;kld jas;l adsl vj;ads ;lsdak;fda ;jlfadksj ;f;kl fweoieurriew;jaf;k lfsaj; f;l sd;l vklvj; asdf',
    score: 200,
    key: '3'
  },
  {
    text:
      'v,.cj .xc,cx pdsjkl;afj kej 38742 i234jo iwrj09fe jr23klfklj v0v i32k 40 v efawjklafwj a0f23 i4jlf09fj23jpor3j-ijorjl2 3kl f09f2j 32kljf0f2j23lkjf0 f 0 23',
    score: 23,
    key: '4'
  },
  {
    text:
      'n,vmmncxcx kljdslk sadf;a ;ldsakj;v ;90aj ;fj ;fw099fj2ljl3lkrj 9009u lkaj aslkj lfl kv,mcvxn, x,m lwekj lf092934jlk2jl',
    score: 5,
    key: '5'
  }
];
