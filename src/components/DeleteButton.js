import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import TrashIcon from '../icons/TrashIcon';
import PropTypes from 'prop-types';

const propTypes = {
  display: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
};

const DeleteButton = ({ display, onDelete }) => {
  return display ? (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={onDelete}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ flex: 1 }} />
  );
};

export default DeleteButton;
