import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {navigate} from '../../helpers';

export default function MyMenu({menuName1, menuName2}) {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => {
    setVisible(false);
    navigate(menuName1);
  };

  const hideMenu2 = () => {
    setVisible(false);
    navigate(menuName2);
  };

  const showMenu = () => setVisible(true);

  return (
    <View style={styles.menu}>
      <Menu
        visible={visible}
        anchor={<Text onPress={showMenu}>List Menu</Text>}
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>{menuName1 ? menuName1 : null}</MenuItem>
        <MenuItem onPress={hideMenu2}>{menuName2 ? menuName2 : null}</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}
const styles = StyleSheet.create({
  menu: {height: '100%', alignItems: 'center', justifyContent: 'center'},
});
