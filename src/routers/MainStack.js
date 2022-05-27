import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AddByUsername,
  AddPC,
  GroupChat,
  Home,
  Login,
  MyProfile,
  Profile,
  QRCode,
  Register,
  RoomChat,
  Settings,
} from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RoomChat"
        component={RoomChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="My Profile"
        component={MyProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPC"
        component={AddPC}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddByUsername"
        component={AddByUsername}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
