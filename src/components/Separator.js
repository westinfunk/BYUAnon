import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { LIGHT_GRAY } from '../styles';

const alignments = {
  center: 'center',
  right: 'flex-end',
  left: 'flex-start'
};

const defaultProps = {
  height: 2,
  width: '90%',
  color: LIGHT_GRAY,
  backgroundColor: '#FFF',
  align: 'center'
};

export default class Separator extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.backgroundColor,
          alignItems: alignments[this.props.align]
        }}>
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.color,
            borderRadius: this.props.height
          }}
        />
      </View>
    );
  }
}

Separator.defaultProps = defaultProps;
