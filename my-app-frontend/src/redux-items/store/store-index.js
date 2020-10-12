import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/reducers-index';
//import { forbiddenWordsMiddleware } from '../middleware';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(logger, thunkMiddleware))
);

export default store;