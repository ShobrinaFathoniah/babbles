import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input} from '../../components';
import {useDispatch} from 'react-redux';
import {sendDataRegister} from './redux/action';
import {checkSamePassword} from '../../helpers/checkSamePassword';
import {LibreBaskerville} from '../../components/Fonts';

const Register = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Register');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);

  const dispatch = useDispatch();

  const goToLogin = () => navigate('Login');
  const registerUser = () => dispatch(sendDataRegister(name, email, password));

  const checkSamePasswordView = () => {
    return checkSamePassword(password, password1) ? (
      <View>
        <LibreBaskerville>
          The Password is not same, Please Check Again!
        </LibreBaskerville>
      </View>
    ) : null;
  };

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
        {checkSamePasswordView}
        <Input
          onIconPress={() =>
            showPassword1 ? setShowPassword1(false) : setShowPassword1(true)
          }
          onChangeText={value => setPassword1(value)}
          value={password1}
          placeholder="Confirm Password"
          iconName={showPassword1 ? 'eye-with-line' : 'eye'}
          iconSize={20}
          secureTextEntry={showPassword1}
        />
      </Forms>
    </ScrollView>
  );
};

export default Register;
