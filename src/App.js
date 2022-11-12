import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instruments from './Components/Instruments/Instruments';
import Stocks from './Components/Stocks/Stocks';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Stocks/>}/>
        <Route path="/:symbol" element={<Instruments/>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
