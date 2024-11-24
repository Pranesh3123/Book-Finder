import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BookDetail from './components/BookDetails';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/works/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
