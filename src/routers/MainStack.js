import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {
  AddPC,
  GroupChat,
  Home,
  ListKontak,
  Login,
  MyProfile,
  Profile,
  Register,
  RoomChat,
  Settings,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        name="ListKontak"
        component={ListKontak}
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
    </Stack.Navigator>
  );
};

const MainApp = () => (
  <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
    <Tab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <AntDesign name="home" color={color} size={size} />
        ),
      }}
      name="Home"
      component={Home}
    />
    <Tab.Screen
      options={{
        tabBarLabel: 'MyProfile',
        tabBarIcon: ({color, size}) => (
          <AntDesign name="user" color={color} size={size} />
        ),
      }}
      name="MyProfile"
      component={MyProfile}
    />
    <Tab.Screen
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({color, size}) => (
          <AntDesign name="setting" color={color} size={size} />
        ),
      }}
      name="Settings"
      component={Settings}
    />
  </Tab.Navigator>
);

export default MainStack;
