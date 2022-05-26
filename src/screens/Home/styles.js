import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
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
  image: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(100),
  },
  listChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(10),
    marginStart: moderateScale(20),
  },
  textName: {
    color: COLORS.black,
  },
  textContainer: {
    marginStart: moderateScale(10),
  },
  textTitle: {
    alignSelf: 'center',
    color: COLORS.black,
    fontSize: moderateScale(20),
    marginTop: moderateScale(30),
  },
  text: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: COLORS.red_500,
    marginTop: moderateScale(17),
    marginHorizontal: moderateScale(10),
  },
  imageNo: {
    width: moderateScale(200),
    height: moderateScale(200),
    alignSelf: 'center',
    margin: moderateScale(20),
  },
});
