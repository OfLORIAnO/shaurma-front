import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

const root: HTMLElement | null = document.getElementById('root');

if (root === null) throw new Error('root element not found');
ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
);
