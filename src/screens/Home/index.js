import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {MyMenu} from '../../components';
import {styles} from './styles';
import {FloatingAction} from 'react-native-floating-action';
import {useDispatch, useSelector} from 'react-redux';
import {setChoosenUser} from './redux/action';
import {KleeOne} from '../../components/Fonts';
import {ohNo} from '../../assets';

const Home = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Home');

  const dispatch = useDispatch();
  const {selectedUser = {_id: '', displayName: ''}} = useSelector(
    state => state.user,
  );

  const onPress = payload => {
    dispatch(
      setChoosenUser({
        _id: payload._id,
        displayName: payload.displayName,
        photoUrl: payload.photoUrl,
        notifToken: payload.notifToken,
        user: {
          _id: payload._id,
        },
      }),
    );
    navigate('RoomChat');
  };

  const actions = [
    {
      text: 'Personal Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddPC',
      position: 1,
    },
    {
      text: 'Group Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddGC',
      position: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <MyMenu menuName1="My Profile" menuName2="Settings" />
      </View>
      <KleeOne style={styles.textTitle}>Last Seen Chat</KleeOne>
      {selectedUser.displayName ? (
        <View>
          <TouchableOpacity
            style={styles.listChatContainer}
            onPress={() => onPress(selectedUser)}>
            <Image source={{uri: selectedUser.photoUrl}} style={styles.image} />
            <View style={styles.textContainer}>
              <KleeOne style={styles.textName}>
                {selectedUser.displayName}
              </KleeOne>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image source={ohNo} style={styles.imageNo} />
          <KleeOne style={styles.text}>
            You Haven't Seen Any Chat, Let's Start Making a Chat!
          </KleeOne>
        </View>
      )}

      <View style={styles.floatingIcon}>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            navigate(name);
          }}
        />
      </View>
    </View>
  );
};

export default Home;
