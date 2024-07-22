import { Route, Routes } from 'react-router-dom';
import PlacesList from './pages/PlacesList';
import './index.css';
import Header from './components/common/Header';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/places" element={<PlacesList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
