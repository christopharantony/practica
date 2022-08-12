import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ChatProvider from './Context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChatProvider>
        <App />
    </ChatProvider>
);


