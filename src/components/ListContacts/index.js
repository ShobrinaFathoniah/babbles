import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {KleeOne} from '../Fonts';
import {COLORS, navigate} from '../../helpers';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setChoosenUser} from '../../screens/Home/redux/action';

const ListContacts = ({data}) => {
  const dispatch = useDispatch();
  const onPress = payload => {
    dispatch(setChoosenUser(payload));
    navigate('RoomChat');
  };

  const listContact = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listChatContainer}
        onPress={() => onPress(item)}>
        <Image source={{uri: item.photoUrl}} style={styles.image} />
        <View style={styles.textContainer}>
          <KleeOne style={styles.textName}>{item.displayName}</KleeOne>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        keyExtractor={(_item, index) => index}
        data={data}
        renderItem={listContact}
      />
    </View>
  );
};

export default ListContacts;

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
});
