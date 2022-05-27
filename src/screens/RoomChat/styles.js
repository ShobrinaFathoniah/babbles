import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  menuContainer: {
    backgroundColor: COLORS.brown_100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagePreview: {
    width: moderateScale(55),
    height: moderateScale(55),
    margin: moderateScale(5),
  },
  imageNoChat: {
    width: moderateScale(250),
    height: moderateScale(250),
    marginBottom: moderateScale(20),
  },
  containerEmptyChat: {
    transform: [{scaleY: -1}],
    margin: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textEmptyChat: {
    color: COLORS.black,
    fontSize: moderateScale(20),
  },
  imageMessage: {
    width: moderateScale(250),
    height: moderateScale(200),
    resizeMode: 'cover',
  },
  imageModal: {
    borderRadius: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
    fontSize: moderateScale(20),
  },
});
