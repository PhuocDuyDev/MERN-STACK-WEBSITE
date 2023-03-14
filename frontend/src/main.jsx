import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { client } from './client/client';

import 'react-toastify/ReactToastify.min.css';
import './utils.css';

import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <AuthContextProvider>
            <ToastContainer position='top-right' />
            <App />
        </AuthContextProvider>
    </ApolloProvider>
);
