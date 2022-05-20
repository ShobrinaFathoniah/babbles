import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';
import {GiftedChat} from 'react-native-gifted-chat';
import {styles} from './styles';
import {Header, MyMenu} from '../../components';
import {myDb} from '../../helpers/db';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {fcmUrl, FIREBASE_API_KEY} from '../../helpers/apiURL';

const RoomChat = ({route}) => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'RoomChat');

  const {params} = route.params;
  const idRoomChat = params.idRoomChat;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const {_user} = useSelector(state => state.user);

  const createIntialData = useCallback(() => {
    try {
      myDb.ref(`users/${idRoomChat}`).on('value', res => {
        const userData = res.val();
        if (userData.chatRoom) {
          setUser(userData);
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, chatRoom: []};
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [idRoomChat]);

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
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom?.length + 1,
          },
        ],
      });

      await myDb.ref(`users/${idRoomChat}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom.length + 1,
          },
        ],
      });

      isUpdating = false;
      if (!isUpdating) {
        const body = {
          to: _user.notifToken,
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
    [user.chatRoom, _user._id, _user.displayName, _user.notifToken, idRoomChat],
  );

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
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default RoomChat;
