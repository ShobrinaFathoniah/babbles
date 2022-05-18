import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../helpers/colors';

const CircleButton = ({
  style,
  nameIcon,
  color = COLORS.purple_500,
  size = 20,
  onPress,
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity
      testID="circleButton"
      onPress={onPress}
      style={[styles.circle, {...passedStyles}]}>
      <AntDesign name={nameIcon} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  circle: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(100),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.purple_100,
    borderWidth: moderateScale(1),
  },
});
