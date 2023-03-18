import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    alignSelf: 'center',
    color: colors.onBackground,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
  },
  action: {
    marginTop: 40,
  },
  input: {
    marginTop: 10,
  },
  loginButton: {
    height: 50,
    borderRadius: 15,
  },
  loginButtonText: {
    fontSize: 20,
  },
  flex: {
    flex: 1,
  },
});

export default styles;
