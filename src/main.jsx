import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PlaceProvider } from './contexts/PlaceContext';
import { CourseProvider } from './contexts/CourseContext'; // CourseProvider import 추가

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PlaceProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </PlaceProvider>
  </BrowserRouter>
);
