import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, focusedScreen} from '../../helpers';
import {GiftedChat} from 'react-native-gifted-chat';
import {styles} from './styles';
import {MyMenu} from '../../components';
import {myDb} from '../../helpers/db';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {fcmUrl, FIREBASE_API_KEY} from '../../helpers/apiURL';

const RoomChat = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'RoomChat');

  // const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const {_user, selectedUser} = useSelector(state => state.user);
  console.log(selectedUser.user._id, 'selected id');

  const createIntialData = useCallback(() => {
    try {
      myDb.ref(`users/${selectedUser.user._id}`).on('value', res => {
        const userData = res.val();
        if (userData?.roomChat) {
          setUser(userData);
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, roomChat: []};
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser.user._id]);

  useEffect(() => {
    createIntialData();
  }, [createIntialData]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: `Helloo ${idRoomChat}`,
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, [idRoomChat]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await myDb.ref(`users/${_user._id}`).update({
        roomChat: [
          ...user.roomChat,
          {
            ...sendedMessage[0],
            _id: selectedUser.user._id,
          },
        ],
      });

      await myDb.ref(`users/${selectedUser.user._id}`).update({
        roomChat: [
          ...user.roomChat,
          {
            ...sendedMessage[0],
            _id: selectedUser.user._id,
          },
        ],
      });

      isUpdating = false;
      if (!isUpdating) {
        const body = {
          to: user.notifToken,
          notification: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.displayName}`,
          },
          data: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.displayName}`,
          },
        };
        await axios.post(fcmUrl, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=' + FIREBASE_API_KEY,
          },
        });
      }
    },
    [
      user.roomChat,
      _user._id,
      _user.displayName,
      user.notifToken,
      selectedUser.user._id,
    ],
  );

  console.log(user.notifToken);

  const clearChat = () => {
    console.log('Clearchat button press');
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <MyMenu
          menuName1="Clear Chat"
          menuName2="Profile"
          clearingChat={clearChat}
        />
      </View>
      <GiftedChat
        messages={user?.roomChat?.reverse()}
        onSend={sendedMessage => {
          onSend(sendedMessage);
        }}
        optionTintColor="red"
        user={{
          _id: _user._id,
          name: _user.displayName,
          avatar:
            user.photoUrl ?? 'https://randomuser.me/api/portraits/men/36.jpg',
        }}
        messagesContainerStyle={{backgroundColor: COLORS.white}}
      />
    </View>
  );
};

export default RoomChat;
