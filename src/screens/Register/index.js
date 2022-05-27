import {ScrollView, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, focusedScreen, navigate} from '../../helpers';
import {Forms, Header, Input, LoadingBar} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {sendDataRegister} from './redux/action';
import {checkSamePassword} from '../../helpers/checkSamePassword';
import {LibreBaskerville} from '../../components/Fonts';
import {moderateScale} from 'react-native-size-matters';

const Register = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Register');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const {isLoading} = useSelector(state => state.global);

  const dispatch = useDispatch();

  const goToLogin = () => navigate('Login');
  const registerUser = () => dispatch(sendDataRegister(name, email, password));

  const checkSamePasswordView = (a, b) => {
    if (checkSamePassword(a, b)) {
      return null;
    } else {
      return (
        <View style={styles.containerErrorPass}>
          <LibreBaskerville style={styles.textErrorPass}>
            The Password is not same, Please Check Again!
          </LibreBaskerville>
        </View>
      );
    }
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
        {checkSamePasswordView(password, password1)}

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
        {LoadingBar(isLoading)}
      </Forms>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  containerErrorPass: {
    alignSelf: 'center',
    padding: moderateScale(8),
    margin: moderateScale(6),
    backgroundColor: COLORS.red_100,
    borderRadius: moderateScale(5),
  },
  textErrorPass: {
    color: COLORS.black,
  },
});
