import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routers';
import {Provider} from 'react-redux';
import {store} from './src/store';
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
