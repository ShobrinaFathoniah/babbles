import {StyleSheet} from 'react-native';
import {COLORS} from '../../helpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.brown_100,
  },
  floatingIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
});
