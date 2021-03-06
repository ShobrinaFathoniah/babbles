import {TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {LibreBaskerville} from '../Fonts';
import {COLORS} from '../../helpers';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity
      testID="button"
      style={{
        padding: moderateScale(10),
        backgroundColor: COLORS.brown_300,
        borderRadius: moderateScale(5),
        marginHorizontal: moderateScale(5),
        height: moderateScale(40),
      }}
      onPress={onPress}>
      <LibreBaskerville style={{color: COLORS.black}}>{text}</LibreBaskerville>
    </TouchableOpacity>
  );
};

export default Button;
