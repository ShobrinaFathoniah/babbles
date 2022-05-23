import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from '../../components';
import {LibreBaskerville} from '../../components/Fonts';

const AddPC = () => {
  const data = [1, 2, 3, 4, 5, 6];
  const listContact = ({item}) => {
    return (
      <TouchableOpacity>
        <LibreBaskerville>{item}</LibreBaskerville>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Header />
      <FlatList
        keyExtractor={(_item, index) => index}
        data={data}
        renderItem={listContact}
      />
    </View>
  );
};

export default AddPC;
