import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {KleeOne} from '../Fonts';
import {COLORS, navigate} from '../../helpers';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setChoosenUser} from '../../screens/Home/redux/action';

const ListContacts = ({data, onRefresh, refreshing}) => {
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
          <KleeOne style={styles.textName}>
            {item.bio ? item.bio : 'Available'}
          </KleeOne>
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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
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
    margin: moderateScale(8),
    padding: moderateScale(10),
  },
  textName: {
    color: COLORS.black,
  },
  textContainer: {
    marginStart: moderateScale(10),
  },
});
