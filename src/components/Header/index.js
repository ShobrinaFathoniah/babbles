import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import CircleButton from '../CircleButton';
import {COLORS} from '../../helpers';
import {KleeOne} from '../Fonts';

const Header = ({
  button = false,
  nameIcon,
  onPressButton,
  radiusBottom = false,
  text = 'babbles',
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
      fontSize: moderateScale(42),
      margin: moderateScale(10),
      color: COLORS.black,
      letterSpacing: moderateScale(2),
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.brown_100} />
      <KleeOne style={styles.textAppName}>{text}</KleeOne>
      {button ? (
        <CircleButton nameIcon={nameIcon} onPress={onPressButton} />
      ) : null}
    </View>
  );
};

export default Header;
