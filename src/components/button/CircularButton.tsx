import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CircularButtonProps {
  onPress: () => void;
  iconName: string;
}

const CircularButton = ({iconName = 'add', onPress}: CircularButtonProps) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Icon name={iconName} size={40} />
    </TouchableHighlight>
  );
};

export default CircularButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: colors.onSecondary,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 40,
  },
});
