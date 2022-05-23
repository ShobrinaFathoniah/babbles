import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {KleeOne} from '../Fonts';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, navigate} from '../../helpers';

const ListChat = ({dataListChat, onPressChat}) => {
  const listChatItem = ({item}) => {
    // const idRoomChat = item._id;
    console.log();

    return (
      <TouchableOpacity style={styles.listChatContainer} onPress={onPressChat}>
        <Image source={{uri: item.user.avatar}} style={styles.image} />
        <View style={styles.textContainer}>
          <KleeOne style={styles.textName}>{item.user.name}</KleeOne>
          <KleeOne style={styles.textChat}>{item.text}</KleeOne>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={dataListChat?.roomChat}
        keyExtractor={(_item, index) => index}
        renderItem={listChatItem}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      />
    </View>
  );
};

export default ListChat;

const styles = StyleSheet.create({
  image: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(100),
  },
  listChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
  },
  textContainer: {
    marginStart: moderateScale(10),
  },
  textChat: {
    marginTop: moderateScale(5),
    color: COLORS.brown_800,
  },
});
