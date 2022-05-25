import {View} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {Header, ListContacts} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {myDb} from '../../helpers/db';
import {setIsLoading} from '../../store/globalAction';

const AddPC = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const {_user = {_id: ''}} = useSelector(state => state.user);

  const getAllData = useCallback(async () => {
    try {
      const res = await myDb.ref(`/users/${_user._id}/contact`).once('value');
      console.log(res, 'res-addPC');
      setData(res._snapshot.value);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [_user._id, dispatch]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <View>
      <Header />
      <ListContacts data={data} />
    </View>
  );
};

export default AddPC;
