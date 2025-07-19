import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HotelSearchPage from './pages/HotelSearchPage';
import HotelResultsPage from './pages/HotelResultsPage';
import './styles/hotelSearch.css';
import Autocomplete from './components/Autocomplete';

const App: React.FC = () => {
  return(
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HotelSearchPage/>}/>
          <Route
            path="/results"
            element={<HotelResultsPage />}
            />
        </Routes>
      </div>
    </Router>
  );
};

export default App;