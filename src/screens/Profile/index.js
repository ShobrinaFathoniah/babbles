import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, focusedScreen} from '../../helpers';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {LibreBaskerville} from '../../components/Fonts';
import {Header} from '../../components';
import QRCode from 'react-native-qrcode-svg';
import {logo} from '../../assets';

const Profile = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Profile');

  const {selectedUser} = useSelector(state => state.user);
  const [qrCode, setQrCode] = useState(false);

  const seeQrCode = () => {
    if (qrCode) {
      setQrCode(false);
    } else {
      setQrCode(true);
    }
  };

  return (
    <View>
      <Header />
      <Image source={{uri: selectedUser.photoUrl}} style={styles.image} />
      <LibreBaskerville style={styles.textName}>
        {selectedUser.displayName}
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
            value={selectedUser._id}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Profile;

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
});
