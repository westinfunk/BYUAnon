import React, { Component } from 'react';
import { Image } from 'react-native';

const ClockIcon = (props) => {
  const multiple = 0.15;
  const width = props.width || 100 * multiple;
  const height = props.height || 100 * multiple;
  return (
    <Image
      style={{ width, height }}
      source={require('../../assets/clock.png')}
    />
  );
};

export default ClockIcon;
