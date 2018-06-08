import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY } from '../styles';
import PropTypes from 'prop-types';

const propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  size: PropTypes.number
};

const defaultProps = {
  size: 15
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
    return Math.floor(secondsDifference / 60 / 60 / 24 / 1000) + 'd';
  }
};

const TimeDisplay = ({ timestamp, size }) => {
  const timeDisplay = calculateTimeDisplay(timestamp);
  return (
    <View style={Styles.date}>
      <Text style={[Styles.dateText, { fontSize: size }]}>
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
    fontFamily: 'Nunito-Black',
    color: PRIMARY
  }
});

TimeDisplay.propTypes = propTypes;
TimeDisplay.defaultProps = defaultProps;

export default TimeDisplay;
