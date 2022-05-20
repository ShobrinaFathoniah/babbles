import {SET_DATA_REGISTER} from './types';

const initialState = {
  dataEmail: '',
  dataPhone: '',
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_REGISTER:
      return {
        ...state,
        dataEmail: action.email,
        dataPhone: action.phone,
      };

    default:
      return {
        ...state,
      };
  }
};
