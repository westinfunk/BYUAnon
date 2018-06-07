import React, { Component } from 'react';
import { Image } from 'react-native';

const UpvoteUnselectedIcon = (props) => {
  const multiple = 0.7;
  const width = props.width || 60 * multiple;
  const height = props.height || 35 * multiple;
  return (
    <Image
      style={{ width, height }}
      source={require('../../assets/upvote-unselected.png')}
    />
  );
};

export default UpvoteUnselectedIcon;
