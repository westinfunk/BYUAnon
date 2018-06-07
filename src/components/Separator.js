import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { LIGHT_GRAY } from '../styles';

const defaultProps = {
  height: 2,
  width: '90%',
  color: LIGHT_GRAY,
  backgroundColor: '#FFF'
};

export default class Separator extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.backgroundColor,
          alignItems: 'center'
        }}>
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color
          }}
        />
      </View>
    );
  }
}

Separator.defaultProps = defaultProps;
