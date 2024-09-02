import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import MyCabinet from './pages/UserCabinet';
import Header from './components/Header/Header';
import Footer from 'components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/my-cabinet" element={<MyCabinet />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
