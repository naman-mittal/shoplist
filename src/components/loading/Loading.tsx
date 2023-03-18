import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import colors from '../../theme/colors';

interface LoadingProps {
  message?: string;
}

const Loading = ({message = ''}: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  message: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
  },
});
