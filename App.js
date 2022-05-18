import React, {useEffect} from 'react';
// import {View, Button} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
// import analytics from '@react-native-firebase/analytics';
// import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routers';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // const onSignIn = async user => {
  //   crashlytics().log('User signed in.');
  //   await Promise.all([
  //     crashlytics().setUserId(user.uid),
  //     crashlytics().setAttribute('credits', String(user.credits)),
  //     crashlytics().setAttributes({
  //       role: 'admin',
  //       followers: '13',
  //       email: user.email,
  //       username: user.username,
  //     }),
  //   ]);
  // };

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    // <Provider store={store}>
    <Root />
    // </Provider>
    // <View>
    //   <View>
    //     <Button
    //       title="Sign In"
    //       onPress={() =>
    //         onSignIn({
    //           uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
    //           username: 'Joaquin Phoenix',
    //           email: 'phoenix@example.com',
    //           credits: 42,
    //         })
    //       }
    //     />
    //     <Button title="Test Crash" onPress={() => crashlytics().crash()} />
    //   </View>
    //   <View>
    //     <Button
    //       title="Add To Basket"
    //       onPress={async () => {
    //         await analytics().logEvent('login', {
    //           id: 3745092,
    //           item: 'mens grey t-shirt',
    //           description: ['round neck', 'long sleeved'],
    //           size: 'L',
    //         });
    //         const token = await messaging().getToken();
    //         console.log(token, 'token');
    //       }}
    //     />
    //   </View>
    // </View>
  );
};

export default App;
