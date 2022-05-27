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
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      <View style={styles.containerAllBio}>
        <Image source={{uri: selectedUser.photoUrl}} style={styles.image} />
        <View style={styles.containerBio}>
          <LibreBaskerville style={styles.textName}>
            {selectedUser.displayName}
          </LibreBaskerville>
          <LibreBaskerville style={styles.text}>
            {selectedUser.bio ? selectedUser.bio : 'Available'}
          </LibreBaskerville>
          <TouchableOpacity onPress={seeQrCode}>
            <AntDesign
              style={styles.qrCodeButton}
              name="qrcode"
              size={30}
              color={COLORS.brown_500}
            />
          </TouchableOpacity>
        </View>
      </View>

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
    marginVertical: moderateScale(30),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
    fontSize: moderateScale(17),
  },
  text: {
    color: COLORS.black,
    marginTop: moderateScale(10),
  },
  qrCode: {
    alignSelf: 'center',
  },
  containerAllBio: {
    flexDirection: 'row',
  },
  containerBio: {alignSelf: 'center', justifyContent: 'flex-start', flex: 1},
  qrCodeButton: {
    marginVertical: moderateScale(10),
  },
});
