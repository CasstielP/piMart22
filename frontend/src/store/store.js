import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedStore = {}) => {
    createStore(
        rootReducer,
        preloadedStore,
        applyMiddleware(thunk, logger)
    )
}


export default configureStore;
