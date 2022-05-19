import {firebase} from '@react-native-firebase/database';

export const myDb = firebase
  .app()
  .database(
    'https://babble-shobrinaf-default-rtdb.asia-southeast1.firebasedatabase.app',
  );
