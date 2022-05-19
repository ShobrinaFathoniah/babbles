import {applyMiddleware, createStore} from 'redux';
import {allReducers} from './allReducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const allMiddlewares = applyMiddleware(logger, thunk);

export const store = createStore(allReducers, {}, allMiddlewares);
