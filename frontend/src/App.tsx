import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Auth/Login';

import { Students } from './pages/Students';
import { Staff } from './pages/Staff';
import { Attendance } from './pages/Attendance';

import { Dashboard } from './pages/Dashboard';
import { Timetable } from './pages/Timetable';
import { Reports } from './pages/Reports';

import { Complaints } from './pages/Complaints';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="staff" element={<Staff />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="reports" element={<Reports />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
