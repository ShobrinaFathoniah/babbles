import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const Profile = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Profile');

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
