import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';
import {GiftedChat} from 'react-native-gifted-chat';
import {styles} from './styles';
import {Header, MyMenu} from '../../components';

const RoomChat = ({route}) => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'RoomChat');

  const {params} = route.params;
  const idRoomChat = params.idRoomChat;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Helloo ${idRoomChat}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [idRoomChat]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
