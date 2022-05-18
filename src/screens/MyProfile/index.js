import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

export default function MyProfile() {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'MyProfile');

  return (
    <View>
      <Text>MyProfile</Text>
    </View>
  );
}
