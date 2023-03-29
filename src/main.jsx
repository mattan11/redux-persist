import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import store, {persistor} from "./store";
import {Provider} from 'react-redux'

import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
