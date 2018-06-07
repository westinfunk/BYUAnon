import React, { Component } from 'react';
import { Image } from 'react-native';

const UpvoteSelectedIcon = (props) => {
  const multiple = 0.7;
  const width = props.width || 60 * multiple;
  const height = props.height || 35 * multiple;
  return (
    <Image
      style={{ width, height }}
      source={require('../../assets/upvote-selected.png')}
    />
  );
};

export default UpvoteSelectedIcon;
