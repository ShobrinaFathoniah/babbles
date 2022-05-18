import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {LibreBaskerville} from '../Fonts';
import {moderateScale} from 'react-native-size-matters';
import {noConnectionPic} from '../../assets';
import {COLORS} from '../../helpers/colors';

const NoConnection = connection => {
  if (connection) {
    return null;
  } else if (!connection) {
    return (
      <View style={styles.containerPage}>
        <Image style={styles.image} source={noConnectionPic} />
        <LibreBaskerville style={styles.text}>
          Turn On your Internet Connection, Please! :)
        </LibreBaskerville>
      </View>
    );
  }
};

export default NoConnection;

const styles = StyleSheet.create({
  containerPage: {
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  image: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
    color: COLORS.green_100,
    textAlign: 'center',
    margin: moderateScale(15),
  },
});
