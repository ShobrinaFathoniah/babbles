import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, focusedScreen, navigate} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {LibreBaskerville} from '../../components/Fonts';
import {moderateScale} from 'react-native-size-matters';
import QRCode from 'react-native-qrcode-svg';
import {logo} from '../../assets';
import {Button, Header} from '../../components';
import {setDataUser} from '../../store/userAction';
import {setChoosenUser} from '../Home/redux/action';

export default function MyProfile() {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'MyProfile');

  const {_user} = useSelector(state => state.user);
  const [qrCode, setQrCode] = useState(false);
  const dispatch = useDispatch();
  console.log(_user);

  const seeQrCode = () => {
    if (qrCode) {
      setQrCode(false);
    } else {
      setQrCode(true);
    }
  };

  const logOut = () => {
    dispatch(setDataUser({}));
    dispatch(setChoosenUser({displayName: ''}));
    navigate('Login');
  };

  return (
    <View>
      <Header />
      <Image source={{uri: _user.photoURL}} style={styles.image} />
      <LibreBaskerville style={styles.textName}>
        {_user.displayName}
      </LibreBaskerville>
      <TouchableOpacity onPress={seeQrCode}>
        <LibreBaskerville style={styles.textQrCode}>QR Code</LibreBaskerville>
      </TouchableOpacity>
      {qrCode ? (
        <View style={styles.qrCode}>
          <QRCode
            size={200}
            logo={logo}
            logoSize={30}
            logoBackgroundColor="transparent"
            value={_user._id}
          />
        </View>
      ) : null}
      <View style={styles.button}>
        <Button text="LogOut" onPress={logOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    alignSelf: 'center',
    margin: moderateScale(30),
    borderRadius: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
    alignSelf: 'center',
    fontSize: moderateScale(17),
  },
  textQrCode: {
    color: COLORS.black,
    margin: moderateScale(10),
  },
  qrCode: {
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    margin: moderateScale(10),
    marginTop: moderateScale(30),
  },
});
