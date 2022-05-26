import {View, Alert} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {Header, ListContacts, LoadingBar} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {myDb} from '../../helpers/db';
import {setIsLoading} from '../../store/globalAction';
import {navigate} from '../../helpers';

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
      <Header button={true} nameIcon="plus" onPressButton={onPressButton} />
      {LoadingBar(isLoading)}
      <ListContacts onRefresh={onRefresh} refreshing={refreshing} data={data} />
    </View>
  );
};

export default AddPC;
