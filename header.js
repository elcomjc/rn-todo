import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class Header extends Component {
  static propTypes = {
    onToggleAllComplete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onAddItem: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      onToggleAllComplete,
      onChange,
      value,
      onAddItem
    } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleAllComplete}>
          <Text style={styles.toogleIcon}>
            {String.fromCharCode(10003)}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onAddItem}
          placeholder="What needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  toogleIcon: {
    fontSize: 30,
    color: '#CCC'
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 16
  }
});
