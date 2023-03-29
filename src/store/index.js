import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import countReducer from '../features/countSlice';

const appReducer = combineReducers({
    auth: authReducer,
    count: countReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'hydrate') {
        return appReducer(action.payload, action.payload);
    }

    return appReducer(state, action);
}

let store = configureStore({
    reducer: rootReducer,
});

store.subscribe(() => {
    const state = store.getState();
    fetch('http://localhost:8090/state', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
    })
        .then(r => r.json())
        .then((data) => console.log(data));
});

export default store;