import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const GroupChat = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'GroupChat');

  return (
    <View>
      <Text>GroupChat</Text>
    </View>
  );
};

export default GroupChat;
