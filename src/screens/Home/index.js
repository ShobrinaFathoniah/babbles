import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, focusedScreen, navigate} from '../../helpers';
import {MyMenu} from '../../components';
import {styles} from './styles';
import {FloatingAction} from 'react-native-floating-action';
import {useDispatch, useSelector} from 'react-redux';
import {setChoosenUser} from './redux/action';
import {KleeOne, LibreBaskerville} from '../../components/Fonts';
import {addFriend, addGroupFriend, chat, ohNo} from '../../assets';
import {Easing} from 'react-native-reanimated';

const Home = () => {
  const isFocused = useIsFocused();
  const leftValue = useState(new Animated.Value(0))[0];
  focusedScreen(isFocused, 'Home');

  const dispatch = useDispatch();
  const {selectedUser = {_id: '', displayName: ''}} = useSelector(
    state => state.user,
  );

  const style = StyleSheet.create({
    animationBall: {
      borderRadius: 100 / 2,
      width: 50,
      height: 50,
      backgroundColor: COLORS.red_500,
      marginLeft: leftValue,
    },
  });

  const moveBall = () => {
    Animated.timing(leftValue, {
      toValue: 1000,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const moveBallWithBack = () => {
    Animated.timing(leftValue, {
      toValue: 1000,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.back(),
    }).start();
  };

  const moveWithSpringBall = () => {
    Animated.timing(leftValue, {
      toValue: 300,
      useNativeDriver: false,
    }).start();
  };

  const onPress = payload => {
    dispatch(
      setChoosenUser({
        _id: payload._id,
        displayName: payload.displayName,
        photoUrl: payload.photoUrl,
        bio: payload.bio,
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
      icon: addFriend,
      name: 'AddPC',
      position: 1,
      color: COLORS.brown_100,
    },
    {
      text: 'Group Chat',
      icon: addGroupFriend,
      name: 'AddGC',
      position: 2,
      color: COLORS.brown_100,
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
              <KleeOne style={styles.textBio}>
                {selectedUser.bio ? selectedUser.bio : 'Available'}
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
          <View style={styles.animationContainer}>
            <Animated.View style={style.animationBall} />
            <TouchableOpacity onPress={moveBall}>
              <LibreBaskerville>Move Me!</LibreBaskerville>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.floatingIcon}>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            navigate(name);
          }}
          floatingIcon={chat}
          color={COLORS.brown_100}
          tintColor={COLORS.white}
          iconHeight={19}
          iconWidth={19}
        />
      </View>
    </View>
  );
};

export default Home;
