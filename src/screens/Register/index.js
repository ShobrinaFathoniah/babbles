import {ScrollView} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input} from '../../components';

const Register = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Register');

  const goToLogin = () => navigate('Login');
  const registerUser = () => null;

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      <Forms
        type="Register"
        onPressText={goToLogin}
        onPressButton={registerUser}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          iconName="email"
        />
        <Input
          placeholder="Phone Number"
          keyboardType="phone-pad"
          iconName="phone"
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          iconName="eye-with-line"
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          iconName="eye-with-line"
        />
      </Forms>
    </ScrollView>
  );
};

export default Register;
