import {ScrollView} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input} from '../../components';

const Login = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Login');

  const goToRegister = () => navigate('Register');
  const signIn = () => navigate('Home');

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      <Forms type="Login" onPressText={goToRegister} onPressButton={signIn}>
        <Input iconName="email" iconSize={20} placeholder="Email" />
        <Input
          iconName="eye-with-line"
          iconSize={20}
          placeholder="Password"
          secureTextEntry={true}
        />
      </Forms>
    </ScrollView>
  );
};

export default Login;
