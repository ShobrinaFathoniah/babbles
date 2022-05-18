import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {navigationRef} from '../helpers';
// import {useDispatch} from 'react-redux';
// import NetInfo from '@react-native-community/netinfo';
// import {setConnection} from '../store/globalAction';

const Root = () => {
  // const dispatch = useDispatch();

  // NetInfo.addEventListener(state => {
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);

  //   dispatch(setConnection(state.isConnected));
  // });

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
