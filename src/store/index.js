import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import countReducer from '../features/countSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    count: countReducer,
});

let store = null;

export const configureStoreAsync = () => {
    return new Promise(resolve => {
        fetch('http://localhost:8090/state')
            .then(res => res.json())
            .then(preloadedState => {
                const options = {
                    reducer: rootReducer,
                    preloadedState,
                }

                if (preloadedState) {
                    options.preloadedState = preloadedState;
                }

                store = configureStore(options);

                resolve(store);
            });
    });
}

export const saveStateAsync = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8090/state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(store.getState()),
        })
            .then(r => r.json())
            .then((res) => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
                console.log(err, 'err');
            });
    });
}

export default store;