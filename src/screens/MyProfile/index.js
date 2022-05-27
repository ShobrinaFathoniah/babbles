import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, focusedScreen, navigate} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {LibreBaskerville} from '../../components/Fonts';
import {moderateScale} from 'react-native-size-matters';
import QRCode from 'react-native-qrcode-svg';
import {logo} from '../../assets';
import {Button, Header, Input} from '../../components';
import {setDataUser} from '../../store/userAction';
import {setChoosenUser} from '../Home/redux/action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {myDb} from '../../helpers/db';
import {setIsLoading} from '../../store/globalAction';

export default function MyProfile() {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'MyProfile');

  const {_user} = useSelector(state => state.user);
  const [urlImage, setUrlImage] = useState('');
  const [bio, setBio] = useState(_user.bio);
  const [changeBio, setChangeBio] = useState(false);
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

  const changePhotoProfile = async () => {
    dispatch(setIsLoading(true));

    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    const reference = storage().ref(
      `profileImage/${_user._id}/${result.assets[0].fileName}`,
    );

    const pathToFile = result.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);

    const url = await storage()
      .ref(`profileImage/${_user._id}/${result.assets[0].fileName}`)
      .getDownloadURL();

    setUrlImage(url);
    changingPhoto();
  };

  const changingPhoto = async () => {
    let isUpdate = false;
    await myDb.ref(`users/${_user._id}`).update({
      photoURL: urlImage,
    });
    isUpdate = true;

    console.log(urlImage);

    if (isUpdate) {
      const results = await myDb.ref(`users/${_user._id}`).once('value');
      console.log(results);
      if (results.val()) {
        dispatch(setIsLoading(false));
        dispatch(setDataUser(results.val()));
      }
    }
  };

  const changingBioView = () => {
    if (changeBio) {
      setChangeBio(false);
    } else {
      setChangeBio(true);
    }
  };

  const changingBio = async () => {
    let isUpdate = false;
    await myDb.ref(`users/${_user._id}`).update({
      bio: bio,
    });
    isUpdate = true;

    console.log(bio);

    if (isUpdate) {
      const results = await myDb.ref(`users/${_user._id}`).once('value');
      console.log(results);
      if (results.val()) {
        dispatch(setIsLoading(false));
        dispatch(setDataUser(results.val()));
        setChangeBio(false);
      }
    }
  };

  return (
    <View>
      <Header />
      <View style={styles.containerAllBio}>
        <TouchableOpacity onPress={changePhotoProfile}>
          <Image source={{uri: _user.photoURL}} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.containerBio}>
          <LibreBaskerville style={styles.textName}>
            {_user.displayName}
          </LibreBaskerville>
          <LibreBaskerville style={styles.text}>{_user.email}</LibreBaskerville>

          {changeBio ? (
            <View>
              <Input
                style={styles.input}
                onChangeText={value => setBio(value)}
                value={bio}
                placeholder="Change Bio"
                alignSelfInput="flex-start"
                onSubmitEditing={changingBio}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={changingBioView}>
              <LibreBaskerville style={styles.text}>
                {_user.bio ? _user.bio : 'Available'}
              </LibreBaskerville>
            </TouchableOpacity>
          )}
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
  button: {
    alignSelf: 'center',
    margin: moderateScale(10),
    marginTop: moderateScale(20),
  },
  containerAllBio: {
    flexDirection: 'row',
  },
  containerBio: {alignSelf: 'center', justifyContent: 'flex-start', flex: 1},
  qrCodeButton: {
    marginVertical: moderateScale(10),
  },
  input: {
    width: moderateScale(100),
    marginBottom: moderateScale(2),
  },
});
