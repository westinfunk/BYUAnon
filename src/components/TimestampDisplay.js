import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY } from '../styles';
import PropTypes from 'prop-types';

const propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

const calculateTimeDisplay = (timestamp) => {
  const now = Date.now();
  const then = parseInt(timestamp);
  const secondsDifference = (now - then) / 1000;
  if (secondsDifference < 60) {
    return Math.floor(secondsDifference) + 's';
  } else if (secondsDifference < 60 * 60) {
    return Math.floor(secondsDifference / 60) + 'm';
  } else if (secondsDifference < 60 * 60 * 24) {
    return Math.floor(secondsDifference / 60 / 60) + 'h';
  } else {
    return Math.floor(secondsDifference / 60 / 60 / 24) + 'd';
  }
};

const TimeDisplay = ({ timestamp }) => {
  const timeDisplay = calculateTimeDisplay(timestamp);
  return (
    <View style={Styles.date}>
      <Text style={Styles.dateText}>
        <Icon name={'clock'} color={PRIMARY} />
        {' ' + timeDisplay}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  date: {
    flex: 1
  },
  dateText: {
    fontFamily: 'Nunito-ExtraBold',
    color: PRIMARY,
    fontSize: 16
  }
});

TimeDisplay.propTypes = propTypes;

export default TimeDisplay;
