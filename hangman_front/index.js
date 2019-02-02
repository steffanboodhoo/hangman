import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './_app/RootReducer'

const store = createStore(
    RootReducer,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    )
);

import App from './_app/App';

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));