import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const RoomChat = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'RoomChat');
  return (
    <View>
      <Text>RoomChat</Text>
    </View>
  );
};

export default RoomChat;
