import React, { Component } from 'react';
import { Image } from 'react-native';

const TrashIcon = (props) => {
  const multiple = 0.08;
  const width = props.width || 200 * multiple;
  const height = props.height || 233 * multiple;
  return (
    <Image
      style={{ width, height }}
      source={require('../../assets/trash.png')}
    />
  );
};

export default TrashIcon;
