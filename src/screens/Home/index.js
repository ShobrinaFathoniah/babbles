import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {focusedScreen, navigate} from '../../helpers';
import {ListChat, MyMenu} from '../../components';
import {styles} from './styles';
import {FloatingAction} from 'react-native-floating-action';
import {useDispatch, useSelector} from 'react-redux';
import {setChoosenUser} from './redux/action';
import {myDb} from '../../helpers/db';
import {setIsLoading} from '../../store/globalAction';

const Home = () => {
  const isFocused = useIsFocused();
  focusedScreen(isFocused, 'Home');

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {_user = {_id: ''}} = useSelector(state => state.user);

  const saveSelectedPerson = payload => {
    dispatch(setChoosenUser(payload));
    navigate('RoomChat');
  };

  const getAllData = useCallback(async () => {
    try {
      const res = await myDb.ref(`/users/${_user._id}`).once('value');
      console.log(res, 'res-hoome');
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

  const actions = [
    {
      text: 'Personal Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddPC',
      position: 1,
    },
    {
      text: 'Group Chat',
      icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      name: 'AddGC',
      position: 2,
    },
  ];

  // const dataListChat = data;

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <MyMenu menuName1="My Profile" menuName2="Settings" />
      </View>
      <View>
        <ListChat onPressChat={saveSelectedPerson} dataListChat={data} />
      </View>
      <View style={styles.floatingIcon}>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            // navigate(name)
            console.log(name);
          }}
        />
      </View>
    </View>
  );
};

export default Home;
