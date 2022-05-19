import {SET_DATA_REGISTER} from './types';

const initialState = {
  dataEmail: '',
  dataPassword: '',
  dataPhone: '',
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_REGISTER:
      return {
        ...state,
        dataEmail: action.email,
        dataPassword: action.password,
        dataPhone: action.phone,
      };

    default:
      return {
        ...state,
      };
  }
};
