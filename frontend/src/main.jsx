//main.jsx
import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TempSignIn from './components/temp.signin';
import AdminMainDashboard from './components/admin-dashboard';
import EmployeeMainDashboard from './components/employee-dashboard';
import DashboardOverview from './components/adminpagescomponent/dashboard-overview';
import UserManagement from './components/adminpagescomponent/user-management';
import AttendanceLeaveManagement from './components/adminpagescomponent/attendance-leave';
import PerformanceOverview from './components/adminpagescomponent/performance-overview';
import MessagingNotification from './components/adminpagescomponent/messaging-notification';
import Departments from './components/adminpagescomponent/deparments';


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tempsignin" element={<TempSignIn />} />
        <Route path="/admin" element={<AdminMainDashboard />}>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="attendance-leave" element={<AttendanceLeaveManagement />} />
          <Route path="performance-overview" element={<PerformanceOverview />} />
          <Route path="departments" element={<Departments />} />
          <Route path="messaging-notification" element={<MessagingNotification />} />
          
          <Route path="overview" element={<DashboardOverview />} />
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeMainDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
