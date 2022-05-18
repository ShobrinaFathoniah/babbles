import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const Register = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Register');

  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

export default Register;
