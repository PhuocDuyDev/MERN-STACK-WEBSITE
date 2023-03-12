import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './client/client';
import { Provider } from 'react-redux';
import App from './App';

import './utils.css';
import 'react-toastify/ReactToastify.min.css';

import AuthContextProvider from './context/AuthContext';
import store from './features/store.js';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <AuthContextProvider>
                <ToastContainer position='top-right' />
                <App />
            </AuthContextProvider>
        </Provider>
    </ApolloProvider>
);
