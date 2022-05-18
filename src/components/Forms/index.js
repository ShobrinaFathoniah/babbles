import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Courgette, LibreBaskerville} from '../Fonts';
import {COLORS} from '../../helpers';
import {loginPic, registerPic} from '../../assets';

const Forms = ({type, children, onPressButton, onPressText}) => {
  const image = () => {
    if (type === 'Login') {
      return (
        <Image testID="LoginImage" style={styles.image} source={loginPic} />
      );
    } else if (type === 'Register') {
      return (
        <Image testID="RegisImage" style={styles.image} source={registerPic} />
      );
    } else {
      return null;
    }
  };

  const helpText = types => {
    if (types === 'Login') {
      return (
        <View testID="LoginHelpText" style={styles.containerTextHelper}>
          <LibreBaskerville style={{color: COLORS.black}}>
            Not Have an Account?
          </LibreBaskerville>
          <TouchableOpacity testID="ButtonTextRegist" onPress={onPressText}>
            <LibreBaskerville style={styles.text}>Register</LibreBaskerville>
          </TouchableOpacity>
        </View>
      );
    } else if (types === 'Register') {
      return (
        <View testID="RegisHelpText" style={styles.containerTextHelper}>
          <LibreBaskerville style={{color: COLORS.black}}>
            Have an Account?
          </LibreBaskerville>
          <TouchableOpacity testID="ButtonTextLogin" onPress={onPressText}>
            <LibreBaskerville style={styles.text}>Login</LibreBaskerville>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View testID="FormComponent">
      <Courgette style={styles.title}>{type}</Courgette>
      {image()}
      {children}
      <TouchableOpacity
        testID="ButtonLoginRegis"
        style={styles.button}
        onPress={onPressButton}>
        <LibreBaskerville style={styles.buttonText}>{type}</LibreBaskerville>
      </TouchableOpacity>
      {helpText(type)}
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    backgroundColor: COLORS.brown_500,
    margin: moderateScale(10),
    width: moderateScale(260),
  },
  buttonText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: moderateScale(14),
  },
  image: {
    width: moderateScale(250),
    height: moderateScale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: moderateScale(12),
    color: COLORS.brown_500,
    marginStart: moderateScale(10),
  },
  containerTextHelper: {
    flexDirection: 'row',
    margin: moderateScale(10),
    alignSelf: 'center',
  },
  title: {
    color: COLORS.brown_800,
    alignSelf: 'center',
    fontSize: moderateScale(32),
    letterSpacing: moderateScale(0.5),
    marginTop: moderateScale(15),
  },
});
