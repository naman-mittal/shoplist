import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.onBackground,
  },
  action: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  itemsContainer: {
    flex: 1,
    marginTop: 20,
  },
  footerView: {
    height: 50,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.graySahde,
  },
});

export default styles;
