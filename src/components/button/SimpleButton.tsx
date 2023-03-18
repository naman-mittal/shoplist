import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';

interface SimpleButtonProps {
  name: string;
  onPress: () => void;
  backgroundColor?: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

const SimpleButton = ({
  name,
  onPress,
  backgroundColor = colors.primary,
  buttonStyle,
  buttonTextStyle,
}: SimpleButtonProps) => {
  return (
    <TouchableHighlight
      style={[styles.button, {backgroundColor: backgroundColor}, buttonStyle]}
      onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{name}</Text>
    </TouchableHighlight>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.onPrimary,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
