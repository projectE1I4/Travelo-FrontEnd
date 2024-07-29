import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { PlaceProvider } from './contexts/PlaceContext';
import { CourseGroupProvider } from './contexts/CourseGroupContext.jsx';
import { CourseProvider } from './contexts/CourseContext';
import { BrowseProvider } from './contexts/BrowseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PlaceProvider>
      <CourseProvider>
        <CourseGroupProvider>
          <BrowseProvider>
            <App />
          </BrowseProvider>
        </CourseGroupProvider>
      </CourseProvider>
    </PlaceProvider>
  </BrowserRouter>
);
