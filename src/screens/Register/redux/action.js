// import axios from 'axios';
import {Alert} from 'react-native';
import {setIsLoading} from '../../../store/globalAction';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {navigate} from '../../../helpers';
import {myDb} from '../../../helpers/db';
import {setDataUser} from '../../../store/userAction';

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
          phoneNumber: res.user.phoneNumber ? res.user.phoneNumber : 0,
          photoURL: res.user.photoURL
            ? res.user.photoURL
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          contact: '',
          _id: res.user.uid,
          notifToken: token,
        };
        await myDb.ref(`users/${res.user.uid}`).set(payload);
        dispatch(setDataUser(payload));
        navigate('Home');
        dispatch(setIsLoading(false));
      }
    }
  } catch (error) {
    Alert.alert('Pemberitahuan', `${error}`);

    dispatch(setIsLoading(false));
  }
};
