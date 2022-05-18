import {View} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';
import {MyMenu} from '../../components';
import {styles} from './styles';

const Home = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Home');

  return (
    <View>
      <View style={styles.menu}>
        <MyMenu menuName1="My Profile" menuName2="Settings" />
      </View>
      <View />
    </View>
  );
};

export default Home;
