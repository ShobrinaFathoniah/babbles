import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const Login = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Login');

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
