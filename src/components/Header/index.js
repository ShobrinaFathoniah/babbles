import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import CircleButton from '../CircleButton';
import {COLORS} from '../../helpers';
import {Ole} from '../Fonts';

const Header = ({
  button = false,
  nameIcon,
  onPressButton,
  radiusBottom = false,
  text = 'babbles',
  color,
  size,
  backgroundColor,
}) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.brown_100,
      justifyContent: button ? 'space-evenly' : 'center',
      borderBottomEndRadius: radiusBottom ? 150 : 0,
      borderBottomStartRadius: radiusBottom ? 150 : 0,
    },
    textAppName: {
      fontSize: moderateScale(55),
      color: COLORS.black,
      letterSpacing: moderateScale(3),
      textAlign: 'center',
    },
    button: {
      marginStart: moderateScale(100),
    },
  });

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.brown_100} />
      <Ole style={styles.textAppName}>{text}</Ole>
      {button ? (
        <CircleButton
          style={styles.button}
          nameIcon={nameIcon}
          onPress={onPressButton}
          backgroundColor={backgroundColor}
          color={color}
          size={size}
        />
      ) : null}
    </View>
  );
};

export default Header;
