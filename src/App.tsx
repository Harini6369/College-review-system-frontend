import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminCollegeEditPage from './pages/AdminCollegeEditPage';
import AdminCollegesPage from './pages/AdminCollegesPage';
import AdminUsersPage from './pages/AdminUsersPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import CollegesPage from './pages/CollegesPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<CollegesPage />} />
      <Route path="/colleges/:id" element={<CollegeDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/colleges"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminCollegesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/colleges/:id"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminCollegeEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
);

export default App;
