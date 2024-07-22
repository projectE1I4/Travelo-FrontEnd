import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PlaceProvider } from './contexts/PlaceContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaceProvider>
        <App />
      </PlaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
