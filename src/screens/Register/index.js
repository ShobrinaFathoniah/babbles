import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input} from '../../components';
import {useDispatch} from 'react-redux';
import {sendDataRegister} from './redux/action';

const Register = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Register');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const goToLogin = () => navigate('Login');
  const registerUser = () => dispatch(sendDataRegister(name, email, password));

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      <Forms
        type="Register"
        onPressText={goToLogin}
        onPressButton={registerUser}>
        <Input
          onChangeText={value => setEmail(value)}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          iconName="email"
        />
        <Input
          onChangeText={value => setName(value)}
          value={name}
          placeholder="Name"
          iconName="user"
        />
        <Input
          onChangeText={value => setPassword(value)}
          value={password}
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
