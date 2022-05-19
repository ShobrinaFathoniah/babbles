// import axios from 'axios';
import {Alert} from 'react-native';
import {setIsLoading} from '../../../store/globalAction';
import {SET_DATA_REGISTER} from './types';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {navigate} from '../../../helpers';
import {myDb} from '../../../helpers/db';

export const sendDataRegister = (name, email, password) => async dispatch => {
  dispatch(setIsLoading(true));
  const auth = authProvider();
  const messaging = messagingProvider();

  try {
    setIsLoading(true);
    const res = await auth.createUserWithEmailAndPassword(email, password);
    console.log(res);
    if ('email' in res.user && res.user.email) {
      await auth.currentUser.updateProfile({
        displayName: name,
      });

      const token = await messaging.getToken();

      if (token) {
        const payload = {
          displayName: name,
          email: res.user.email,
          phoneNumber: res.user.phoneNumber,
          photoURL: res.user.photoURL,
          contact: [],
          roomChat: [],
          _id: res.user.uid,
          notifToken: token,
        };
        await myDb.ref(`users/${res.user.uid}`).set(payload);
        dispatch(saveDataRegister(payload));
        navigate('Home');
      }
    }
  } catch (error) {
    Alert.alert('Pemberitahuan', `${error}`);

    dispatch(setIsLoading(false));
  }
};

export const saveDataRegister = data => {
  return {
    type: SET_DATA_REGISTER,
    email: data.email,
    password: data.password,
    phone: data.phoneNumber,
  };
};
