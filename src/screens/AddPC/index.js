import {View, Alert, Image, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {Header, ListContacts, LoadingBar} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {myDb} from '../../helpers/db';
import {setIsLoading} from '../../store/globalAction';
import {COLORS, navigate} from '../../helpers';
import {LibreBaskerville} from '../../components/Fonts';
import {ohNo} from '../../assets';
import {styles} from '../Home/styles';

const AddPC = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {_user = {_id: ''}} = useSelector(state => state.user);
  const {isLoading} = useSelector(state => state.global);

  const getAllData = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await myDb.ref(`/users/${_user._id}/contact`).once('value');
      setData(res._snapshot.value);
    } catch (error) {
      Alert.alert('Notification', error);
    } finally {
      dispatch(setIsLoading(false));
      setRefreshing(false);
    }
  }, [_user._id, dispatch]);

  const onPressButton = () => navigate('AddByUsername');

  const onRefresh = () => {
    setRefreshing(true);
    getAllData();
  };

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <View>
      <Header
        button={true}
        backgroundColor={COLORS.brown_100}
        size={35}
        color={COLORS.brown_800}
        nameIcon="plus"
        onPressButton={onPressButton}
      />
      {LoadingBar(isLoading)}
      {data.length > 0 ? (
        <ListContacts
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={data}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }>
          <Image source={ohNo} style={styles.imageNo} />
          <LibreBaskerville style={styles.text}>
            You Don't Have Any Contact! Please Add Your Friend or Refresh The
            Page!
          </LibreBaskerville>
        </ScrollView>
      )}
    </View>
  );
};

export default AddPC;
