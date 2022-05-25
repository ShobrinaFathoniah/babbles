import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {KleeOne} from '../Fonts';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, navigate} from '../../helpers';
import {setChoosenUser} from '../../screens/Home/redux/action';

const ListChat = ({dataListChat, onPressChat}) => {
  const {_user = {_id: ''}} = useSelector(state => state.user);
  const [dataChat, setDataChat] = useState([]);
  const [listIDChat, setListIDChat] = useState([]);
  const dispatch = useDispatch();

  const saveSelectedPerson = payload => {
    dispatch(setChoosenUser(payload));
    navigate('RoomChat');
  };

  const listChatItem = ({item}) => {
    // const idRoomChat = item._id;
    // if (item.user._id !== _user._id) {
    console.log(item.chat, 'item');
    return (
      <TouchableOpacity
        style={styles.listChatContainer}
        onPress={() => saveSelectedPerson(item)}>
        {/* <Image source={{uri: item.user.avatar}} style={styles.image} />
        <View style={styles.textContainer}>
          <KleeOne style={styles.textName}>{item.user.name}</KleeOne>
          <KleeOne style={styles.textChat}>{item.text}</KleeOne> */}
        <KleeOne style={styles.textChat}>{item.chat}</KleeOne>
        {/* </View> */}
      </TouchableOpacity>
    );
    // } else {
    //   return null;
    // }
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
