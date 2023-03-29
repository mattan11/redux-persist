import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import countReducer from '../features/countSlice';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {apiStorage} from './apiStorage';

const rootReducer = combineReducers({
    auth: authReducer,
    count: countReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: apiStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE', 'persist/FLUSH', 'persist/PAUSE', 'persist/REGISTER']
        }
    }),
});

export const persistor = persistStore(store);

export default store;