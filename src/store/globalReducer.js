import {SET_CONNECTION, SET_LOADING, SET_REFRESHING} from './globalTypes';

const initialState = {
  isLoading: false,
  connection: true,
  refreshing: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };

    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.refresh,
      };

    case SET_CONNECTION:
      return {
        ...state,
        connection: action.connection,
      };

    default:
      return {
        ...state,
      };
  }
};
