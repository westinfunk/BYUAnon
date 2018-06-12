import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import {
  PRIMARY,
  LIGHT_GRAY,
  DARK_GRAY,
  BACKGROUND_GRAY,
  DROP_SHADOW
} from '../styles';

export default class ProfileScreen extends Component {
  navigateToScreen(screen, title) {
    this.props.navigator.push({
      screen,
      title,
      backButtonTitle: ''
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.list}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={item.icon}
              titleStyle={{ fontFamily: 'Nunito-SemiBold', color: DARK_GRAY }}
              chevronColor={PRIMARY}
              containerStyle={{ backgroundColor: '#FFF' }}
              onPress={() => this.navigateToScreen(item.screen, item.title)}
            />
          ))}
        </View>
      </View>
    );
  }
}

const list = [
  {
    title: 'My Posts',
    icon: { name: 'message-square', type: 'feather' },
    screen: 'UserMessages'
  },
  {
    title: "Posts I've Replied To",
    icon: { name: 'users', type: 'feather' },
    screen: 'UserReplies'
  }
];

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GRAY
  },
  list: {
    ...DROP_SHADOW
  }
});
