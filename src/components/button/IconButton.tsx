import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';

interface IconButtonProps {
  iconName: string;
  size?: number;
  iconColor?: string;
  onPress?: () => void;
  iconContainerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
}

const IconButton = ({
  iconName,
  size = 20,
  iconColor = colors.primary,
  onPress,
  iconContainerStyle,
  iconStyle,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, iconContainerStyle]}
      onPress={onPress}>
      <Icon
        style={[styles.icon, iconStyle]}
        name={iconName}
        size={size}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {},
  icon: {},
});
