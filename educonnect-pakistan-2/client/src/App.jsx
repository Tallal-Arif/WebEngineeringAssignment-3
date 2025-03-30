import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import TutorDashboard from './pages/tutor/TutorDashboard.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import StudentSessions from './pages/student/StudentSessions.jsx';
import TutorSessions from './pages/tutor/TutorSessions.jsx';
import TutorList from './pages/student/TutorList.jsx';
import TutorProfile from './pages/student/TutorProfile.jsx';
import Wishlist from './pages/student/Wishlist.jsx';
import TutorTutorProfile from './pages/tutor/TutorProfile.jsx';
import Navbar from './components/common/Navbar.jsx';
import StudentProfile from './pages/student/StudentProfile.jsx';
import Register from './pages/auth/Register.jsx';

const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/student/sessions"
            element={
                <ProtectedRoute allowedRoles={['student']}>
                <StudentSessions />
                </ProtectedRoute>
            }
            />
        <Route
            path="/tutor/sessions"
            element={
                <ProtectedRoute allowedRoles={['tutor']}>
                <TutorSessions />
                </ProtectedRoute>
            }
            />
        <Route
            path="/student/tutors"
            element={
                <ProtectedRoute allowedRoles={['student']}>
                <TutorList />
                </ProtectedRoute>
            }
            />
        <Route
            path="/student/tutors/:id"
            element={
                <ProtectedRoute allowedRoles={['student']}>
                <TutorProfile />
                </ProtectedRoute>
            }
            />
        <Route
            path="/student/wishlist"
            element={
                <ProtectedRoute allowedRoles={['student']}>
                <Wishlist />
                </ProtectedRoute>
            }
            />
        <Route
            path="/tutor/profile"
            element={
                <ProtectedRoute allowedRoles={['tutor']}>
                <TutorTutorProfile />
                </ProtectedRoute>
            }
            />
        <Route
            path="/student/profile"
            element={
                <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
                </ProtectedRoute>
            }
            />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
