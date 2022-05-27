import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import {COLORS, navigate} from '../../helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale} from 'react-native-size-matters';

export default function MyMenu({menuName1, menuName2, clearingChat}) {
  const [visible, setVisible] = useState(false);
  const clearChat = clearingChat;

  const hideMenu = () => {
    if (menuName1 === 'Clear Chat') {
      clearChat();
    } else {
      navigate(menuName1);
      setVisible(false);
    }
  };

  const hideMenu2 = () => {
    if (menuName2 === 'Clear Chat') {
      clearChat();
    } else {
      navigate(menuName2);
      setVisible(false);
    }
  };

  const cancelMenu = () => {
    setVisible(false);
  };

  const showMenu = () => setVisible(true);

  return (
    <View style={styles.menu}>
      <Menu
        visible={visible}
        anchor={
          <Entypo
            onPress={showMenu}
            name="dots-three-vertical"
            size={23}
            color={COLORS.brown_500}
          />
        }
        onRequestClose={cancelMenu}>
        <MenuItem onPress={hideMenu}>{menuName1 ? menuName1 : null}</MenuItem>
        <MenuItem onPress={hideMenu2}>{menuName2 ? menuName2 : null}</MenuItem>
      </Menu>
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {
    margin: moderateScale(15),
  },
});
