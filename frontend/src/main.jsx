// main.jsx
import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import TempSignIn from './components/temp.signin';
import AdminMainDashboard from './components/admin-dashboard';
import EmployeeMainDashboard from './components/employee-dashboard';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tempsignin" element={<TempSignIn />} />
        <Route path="/admin-dashboard" element={<AdminMainDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeMainDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
