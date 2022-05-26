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
import {generateId} from '../../helpers/generateId';

const RoomChat = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'RoomChat');

  const [roomChat, setRoomcChat] = useState([]);
  const {_user, selectedUser} = useSelector(state => state.user);

  const createIntialData = useCallback(() => {
    try {
      myDb
        .ref(
          `roomChat/personalChat/${generateId(
            _user._id,
            selectedUser.user._id,
          )}`,
        )
        .on('value', res => {
          const userData = res.val();

          if (userData && userData.chat) {
            setRoomcChat(userData);
          } else {
            setRoomcChat(prevState => {
              return {...prevState, ...userData, chat: []};
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser.user._id, _user._id]);

  useEffect(() => {
    createIntialData();
  }, [createIntialData]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await myDb
        .ref(
          `roomChat/personalChat/${generateId(
            _user._id,
            selectedUser.user._id,
          )}`,
        )
        .update({
          chat: [
            ...roomChat.chat,
            {
              ...sendedMessage[0],
              createdAt: new Date(),
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
    [
      roomChat,
      _user._id,
      _user.displayName,
      _user.notifToken,
      selectedUser.user._id,
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
        messages={roomChat?.chat?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })}
        onSend={sendedMessage => {
          onSend(sendedMessage);
        }}
        optionTintColor="red"
        user={{
          _id: _user._id,
          name: _user.displayName,
          avatar:
            _user.photoUrl ?? 'https://randomuser.me/api/portraits/men/36.jpg',
        }}
        messagesContainerStyle={{backgroundColor: COLORS.white}}
      />
    </View>
  );
};

export default RoomChat;
