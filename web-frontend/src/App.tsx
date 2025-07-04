import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/dashboard/index';
import Statistics from './pages/admin/statistics/index';
import ViewStats from './pages/admin/statistics/ViewStats';
import AlumniData from './pages/admin/statistics/AlumniData';
import Login from './pages/admin/Login/index';
import Tracker from './pages/admin/tracker/index';
import Users from './pages/admin/users/index';
import Logout from './pages/admin/Logout/index';
import AlumniDashboard from './pages/alumni/Dashboard';
// import other pages like Statistics, Users, etc.

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root URL to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Actual routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/ViewStats" element={<ViewStats />} />
        <Route path="/AlumniData/:year" element={<AlumniData />} />
        <Route path="/tracker/*" element={<Tracker />} />
        <Route path="/users" element={<Users />} />
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />

        {/* Add more routes like:
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/users" element={<Users />} />
        etc.
        */}
      </Routes>
    </Router>
  );
};

export default App;
