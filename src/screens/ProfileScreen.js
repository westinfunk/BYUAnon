import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { PRIMARY, LIGHT_GRAY, DARK_GRAY } from '../styles';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={Styles.container}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={item.icon}
            titleStyle={{ fontFamily: 'Nunito-SemiBold', color: DARK_GRAY }}
            chevronColor={PRIMARY}
          />
        ))}
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
    flex: 1
  }
});
