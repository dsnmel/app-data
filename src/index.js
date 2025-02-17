import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Arsip from './Arsip';
import DataArsip from './DataArsip';
import GrafikArsip from './GrafikArsip';
import Pemeliharaan from './Pemeliharaan';
import PemeliharaanData from './PemeliharaanData';
import GrafikPemeliharaan from './GrafikPemeliharaan';
import BM from './BM';
import DataBM from './DataBM';
import GrafikBM from './GrafikBM';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/arsip" element={<Arsip />} />
        <Route path="/DataArsip" element={<DataArsip />} />
        <Route path="/GrafikArsip" element={<GrafikArsip/>} />
        <Route path="/Pemeliharaan" element={<Pemeliharaan/>} />
        <Route path="/PemeliharaanData" element={<PemeliharaanData/>} />
        <Route path="/GrafikPemeliharaan" element={<GrafikPemeliharaan/>} />
        <Route path="/BM" element={<BM/>}/>
        <Route path="/DataBM" element={<DataBM/>}/>
        <Route path="/GrafikBM" element={<GrafikBM/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
