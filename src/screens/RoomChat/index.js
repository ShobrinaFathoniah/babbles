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

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const {_user, selectedUser} = useSelector(state => state.user);
  const idRoomChat = `${_user._id}${selectedUser.user._id}`;
  const idRoomChat2 = `${selectedUser.user._id}${_user._id}`;

  const createIntialData = useCallback(() => {
    try {
      myDb.ref(`users/${selectedUser.user._id}`).on('value', res => {
        const userData = res.val();
        if (userData?.roomChat) {
          setUser(userData);
          myDb
            .ref(`users/${selectedUser.user._id}/roomChat/${idRoomChat}`)
            .on('value', result => {
              setMessages(result.val());
            });
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, roomChat: []};
          });

          myDb.ref(`users/${selectedUser.user._id}/roomChat`).set({
            listIdChatRoom: [idRoomChat2],
          });

          myDb.ref(`users/${_user._id}/roomChat/`).set({
            listIdChatRoom: [idRoomChat],
          });

          myDb
            .ref(`users/${selectedUser.user._id}/roomChat/${idRoomChat2}`)
            .set({
              chat: [
                {
                  _id: `${idRoomChat2}`,
                  text: `Helloo ${idRoomChat2}`,
                  createdAt: new Date(),
                  user: {
                    _id: `${selectedUser.user._id}`,
                    name: `${selectedUser.displayName}`,
                    avatar: `${selectedUser.photoUrl}`,
                  },
                },
              ],
            });
          myDb.ref(`users/${_user._id}/roomChat/${idRoomChat}`).set({
            chat: [
              {
                _id: `${idRoomChat}`,
                text: `Helloo ${idRoomChat}`,
                createdAt: new Date(),
                user: {
                  _id: `${_user._id}`,
                  name: `${_user.displayName}`,
                  avatar: `${_user.photoURL}`,
                },
              },
            ],
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [
    selectedUser.user._id,
    selectedUser.displayName,
    selectedUser.photoUrl,
    idRoomChat,
    _user._id,
    _user.displayName,
    _user.photoURL,
    idRoomChat2,
  ]);

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
      await myDb.ref(`users/${_user._id}/roomChat/${idRoomChat}`).update({
        chat: [
          ...messages.chat,
          {
            ...sendedMessage[0],
            _id: idRoomChat,
          },
        ],
      });

      await myDb
        .ref(`users/${selectedUser.user._id}/roomChat/${idRoomChat}`)
        .update({
          chat: [
            ...messages.chat,
            {
              ...sendedMessage[0],
              _id: idRoomChat,
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
      console.log(sendedMessage, 'sendedMessage');
    },
    [
      messages,
      _user._id,
      _user.displayName,
      user.notifToken,
      selectedUser.user._id,
      idRoomChat,
    ],
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
        messages={messages?.chat?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })}
        onSend={sendedMessage => {
          onSend(sendedMessage);
        }}
        optionTintColor="red"
        user={{
          _id: user._id,
          name: user.displayName,
          avatar:
            user.photoUrl ?? 'https://randomuser.me/api/portraits/men/36.jpg',
        }}
        messagesContainerStyle={{backgroundColor: COLORS.white}}
      />
    </View>
  );
};

export default RoomChat;
