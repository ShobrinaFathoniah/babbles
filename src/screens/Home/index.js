import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const Home = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Home');

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
