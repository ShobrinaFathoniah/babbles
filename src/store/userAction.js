import {LOG_OUT, SET_DATA_USER} from '../screens/Login/redux/types';

export const setDataUser = data => {
  return {
    type: SET_DATA_USER,
    data: data,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
