import {Alert} from 'react-native';
import {setIsLoading} from '../../../store/globalAction';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';
import {navigate} from '../../../helpers';
import {myDb} from '../../../helpers/db';
import {setDataUser} from '../../../store/userAction';

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
