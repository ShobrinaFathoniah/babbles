// import axios from 'axios';
import {Alert} from 'react-native';
import {setIsLoading} from '../../../store/globalAction';
import {LOG_OUT, SET_DATA_LOGIN} from './types';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {navigate} from '../../../helpers';
import {myDb} from '../../../helpers/db';

export const sendDataLogin = (email, password) => async dispatch => {
  dispatch(setIsLoading(true));
  const auth = authProvider();
  const messaging = messagingProvider();

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    console.log(res);

    const token = await messaging.getToken();

    if (token) {
      let isUpdate = false;
      await myDb.ref(`users/${res.user.uid}`).update({
        notifToken: token,
      });
      isUpdate = true;

      if (isUpdate) {
        const results = await myDb.ref(`users/${res.user.uid}`).once('value');
        console.log(results);
        if (results.val()) {
          dispatch(setIsLoading(false));
          dispatch(setDataUser(results.val()));
          navigate('Home');
        }
      }
    }
  } catch (error) {
    Alert.alert('Pemberitahuan', `${error}`);

    dispatch(setIsLoading(false));
  }
};

export const setDataUser = data => {
  return {
    type: SET_DATA_LOGIN,
    data: data,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
