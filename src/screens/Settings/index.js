import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const Settings = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Settings');

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
