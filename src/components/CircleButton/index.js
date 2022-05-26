import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../helpers';

const CircleButton = ({
  style,
  nameIcon,
  color = COLORS.brown_100,
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
    backgroundColor: COLORS.brown_700,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.brown_100,
    borderWidth: moderateScale(1),
  },
});
