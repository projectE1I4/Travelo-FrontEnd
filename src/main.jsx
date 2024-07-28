import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PlaceProvider } from './contexts/PlaceContext';
import { CourseGroupProvider } from './contexts/CourseGroupContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PlaceProvider>
      <CourseGroupProvider>
        <App />
      </CourseGroupProvider>
    </PlaceProvider>
  </BrowserRouter>
);
