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
            />
          ))}
        </View>
      </View>
    );
  }
}

const list = [
  {
    title: 'My posts',
    icon: { name: 'message-square', type: 'feather' }
  },
  {
    title: "Posts I've replied to",
    icon: { name: 'users', type: 'feather' }
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
