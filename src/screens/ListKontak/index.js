import {View, Text} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen} from '../../helpers';

const ListKontak = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'ListKontak');

  return (
    <View>
      <Text>ListKontak</Text>
    </View>
  );
};

export default ListKontak;
