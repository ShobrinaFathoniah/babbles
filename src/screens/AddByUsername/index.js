import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, navigate} from '../../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header, Input, LoadingBar} from '../../components';
import {setIsLoading} from '../../store/globalAction';
import {useDispatch, useSelector} from 'react-redux';
import {myDb} from '../../helpers/db';
import {KleeOne} from '../../components/Fonts';
import {setChoosenUser} from '../Home/redux/action';

const AddByUsername = ({route}) => {
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [buttonPlus, setButtonPlus] = useState(false);
  const {_user} = useSelector(state => state.user);
  const {isLoading} = useSelector(state => state.global);
  const idUser = route?.params?.idUser;

  const dispatch = useDispatch();

  const getDataSearch = async searchUsername => {
    try {
      dispatch(setIsLoading(true));
      const results = await myDb.ref(`users/${searchUsername}`).once('value');
      setDataSearch(results.val());
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
    }
  };

  const onPress = payload => {
    dispatch(
      setChoosenUser({
        _id: payload._id,
        displayName: payload.displayName,
        notifToken: payload.notifToken,
        photoUrl: payload.photoURL,
        bio: payload.bio,
        user: {
          _id: payload._id,
        },
      }),
    );
    navigate('RoomChat');
  };

  const addFriend = async payload => {
    const listContact = await myDb
      .ref(`users/${_user._id}/contact`)
      .once('value');

    const listContact2 = await myDb
      .ref(`users/${payload._id}/contact`)
      .once('value');

    if (buttonPlus) {
      setButtonPlus(false);
      await myDb.ref(`users/${_user._id}/contact/_id/${payload._id}`).remove();
      await myDb.ref(`users/${payload._id}/contact/_id/${_user._id}`).remove();
    } else {
      setButtonPlus(true);

      if (listContact.val()) {
        await myDb.ref(`users/${_user._id}`).update({
          contact: [
            ...listContact.val(),
            {
              _id: payload._id,
              displayName: payload.displayName,
              photoUrl: payload.photoURL,
              bio: payload.bio,
              notifToken: payload.notifToken,
              user: {
                _id: payload._id,
              },
            },
          ],
        });
      } else {
        await myDb.ref(`users/${_user._id}`).update({
          contact: [
            {
              _id: payload._id,
              notifToken: payload.notifToken,
              bio: payload.bio,
              displayName: payload.displayName,
              photoUrl: payload.photoURL,
              user: {
                _id: payload._id,
              },
            },
          ],
        });
      }

      if (listContact2.val()) {
        await myDb.ref(`users/${payload._id}`).update({
          contact: [
            ...listContact2.val(),
            {
              _id: _user._id,
              displayName: _user.displayName,
              bio: _user.bio,
              notifToken: _user.notifToken,
              photoUrl: _user.photoURL,
              user: {
                _id: _user._id,
              },
            },
          ],
        });
      } else {
        await myDb.ref(`users/${payload._id}`).update({
          contact: [
            {
              _id: _user._id,
              displayName: _user.displayName,
              bio: _user.bio,
              notifToken: _user.notifToken,
              photoUrl: _user.photoURL,
              user: {
                _id: _user._id,
              },
            },
          ],
        });
      }
    }
  };

  const goToQrCode = () => navigate('QRCode');

  return (
    <View>
      <Header
        button={true}
        nameIcon="qrcode"
        backgroundColor={COLORS.brown_100}
        size={35}
        color={COLORS.brown_800}
        onPressButton={goToQrCode}
      />
      <View style={styles.searchBar}>
        <Input
          style={styles.input}
          onChangeText={value => {
            value ? setSearch(value) : setSearch(idUser);
          }}
          value={search ? search : idUser}
          onSubmitEditing={() =>
            search ? getDataSearch(search) : getDataSearch(idUser)
          }
          placeholder="Search in Here"
        />

        <TouchableOpacity
          onPress={() =>
            search ? getDataSearch(search) : getDataSearch(idUser)
          }>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={30}
            color={COLORS.brown_500}
          />
        </TouchableOpacity>
      </View>
      {LoadingBar(isLoading)}
      {dataSearch?.displayName?.length > 0 ? (
        <View style={styles.containerContact}>
          <TouchableOpacity
            style={styles.addContactButton}
            onPress={() => addFriend(dataSearch)}>
            <AntDesign
              style={styles.searchIcon}
              name={!buttonPlus ? 'plus' : 'minus'}
              size={30}
              color={COLORS.brown_500}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listChatContainer}
            onPress={() => onPress(dataSearch)}>
            <Image source={{uri: dataSearch.photoURL}} style={styles.image} />
            <View style={styles.textContainer}>
              <KleeOne style={styles.textName}>
                {dataSearch.displayName}
              </KleeOne>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default AddByUsername;

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(3),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScale(25),
  },
  input: {
    backgroundColor: COLORS.brown_100,
    borderBottomWidth: moderateScale(0),
    width: moderateScale(270),
    paddingStart: moderateScale(40),
  },
  searchIcon: {
    alignItems: 'center',
    marginTop: moderateScale(7),
    marginStart: moderateScale(10),
  },
  image: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(100),
  },
  listChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
  },
  textContainer: {
    marginStart: moderateScale(10),
  },
  addContactButton: {
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  containerContact: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(15),
  },
});
