import {View} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {ListChat, MyMenu} from '../../components';
import {styles} from './styles';
import {FloatingAction} from 'react-native-floating-action';

const Home = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Home');

  const actions = [
    {
      text: 'Personal Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddPC',
      position: 1,
    },
    {
      text: 'Group Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddGC',
      position: 2,
    },
  ];

  const dataListChat = {
    user: [
      {
        id: 1,
        image:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        name: 'Akane Chan',
        chat: 'Hallo this is from hardcode',
      },
      {
        id: 2,
        image:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        name: 'Akane Chan',
        chat: 'Hallo this is from hardcode',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <MyMenu menuName1="My Profile" menuName2="Settings" />
      </View>
      <View>
        <ListChat dataListChat={dataListChat} />
      </View>
      <View style={styles.floatingIcon}>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            // navigate(name)
            console.log(name);
          }}
        />
      </View>
    </View>
  );
};

export default Home;
