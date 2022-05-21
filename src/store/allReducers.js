import {combineReducers} from 'redux';
// import {loginReducer} from '../screens/Login/redux/reducer';
// import {registerReducer} from '../screens/Register/redux/reducer';
import {globalReducer} from './globalReducer';
import UserReducer from './userReducer';

export const allReducers = combineReducers({
  // register: registerReducer,
  // login: loginReducer,
  global: globalReducer,
  user: UserReducer,
});
