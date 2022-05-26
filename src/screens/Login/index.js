import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input, LoadingBar} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {sendDataLogin} from './redux/action';

const Login = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const {isLoading} = useSelector(state => state.global);

  const dispatch = useDispatch();

  const goToRegister = () => navigate('Register');
  const signIn = () => dispatch(sendDataLogin(email, password));

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      <Forms type="Login" onPressText={goToRegister} onPressButton={signIn}>
        <Input
          onChangeText={value => setEmail(value)}
          value={email}
          iconName="email"
          iconSize={20}
          placeholder="Email"
        />
        <Input
          onIconPress={() =>
            showPassword ? setShowPassword(false) : setShowPassword(true)
          }
          onChangeText={value => setPassword(value)}
          value={password}
          iconName={showPassword ? 'eye-with-line' : 'eye'}
          iconSize={20}
          placeholder="Password"
          secureTextEntry={showPassword}
        />
        {LoadingBar(isLoading)}
      </Forms>
    </ScrollView>
  );
};

export default Login;
