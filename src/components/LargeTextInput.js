import React, { Component } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { PRIMARY, DROP_SHADOW, DARK_GRAY } from '../styles';
import { Icon } from 'react-native-elements';
import Separator from '../components/Separator';
import PropTypes from 'prop-types';

const maxLength = 200;

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default class LargeTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charactersRemaining: maxLength,
      text: ''
    };

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  componentDidMount() {
    console.log(this.props, 'those were the props');
  }

  handleChangeText(text) {
    this.setState({
      text,
      charactersRemaining: maxLength - text.length
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <TextInput
          onChangeText={this.handleChangeText}
          multiline
          maxLength={200}
          style={Styles.textInput}
        />
        <Separator />
        <View style={Styles.information}>
          <Text style={Styles.charactersRemainingText}>
            {this.state.charactersRemaining}
          </Text>
          <TouchableOpacity onPress={this.props.onSubmit.bind(this)}>
            <Text style={Styles.buttonTitle}>
              {'Submit '}
              <Icon name="send" type="font-awesome" size={18} color={PRIMARY} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

LargeTextInput.propTypes = propTypes;

const Styles = StyleSheet.create({
  container: {
    ...DROP_SHADOW
  },
  textInput: {
    height: 240,
    color: DARK_GRAY,
    backgroundColor: '#FFF',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 22,
    padding: 20,
    paddingTop: 20
  },
  charactersRemainingText: {
    color: PRIMARY,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18
  },
  information: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  button: {
    borderRadius: 25,
    borderWidth: 4,
    borderColor: PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  buttonTitle: {
    fontFamily: 'Nunito-ExtraBold',
    color: PRIMARY,
    fontSize: 18
  }
});
