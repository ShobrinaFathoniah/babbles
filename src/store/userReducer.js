import {SET_CHOOSEN_USER} from '../screens/Home/redux/types';
import {LOG_OUT, SET_DATA_USER} from '../screens/Login/redux/types';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        _user: action.data,
      };
    case SET_CHOOSEN_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case LOG_OUT: {
      return {};
    }
    default:
      return state;
  }
};
export default UserReducer;
