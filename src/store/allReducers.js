import {combineReducers} from 'redux';
import {registerReducer} from '../screens/Register/redux/reducer';
import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  register: registerReducer,
  // login: loginReducer,
  global: globalReducer,
});
