import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import EndGame from './pages/EndGame';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/endgame" element={<EndGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
