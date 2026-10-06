import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { homePath } from './lib/data';
import Login from './pages/login';
import Signup from './pages/signup';
import Layout from './components/layout';
import ProtectedRoutes from './routes/ProtectedRoutes';
import EmployeeDashboard from './pages/employee/employee-dashboard';
import ApplyLeave from './pages/employee/apply-leave';
import History from './pages/employee/history';
import TeamOverview from './pages/manager/team-overview';
import Approvals from './pages/manager/approvals';
import TeamCalendar from './pages/manager/team-calender';
import CompanyOverview from './pages/admin/company-overview';
import Users from './pages/admin/users';
import { Policies } from './pages/admin/policies';
import { Reports } from './pages/admin/report';


function RoleRedirect() {
  const { user } = useAuth()
  return <Navigate to={user ? homePath[user.role] : '/login'} replace />
}
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes allowed={['employee']} />}>
            <Route path="/dashboard" element={<EmployeeDashboard />} />
          </Route>
          <Route element={<ProtectedRoutes allowed={['employee', 'manager']} />}>
            <Route path="/apply" element={<ApplyLeave />} />
            <Route path="/history" element={<History />} />
          </Route>
          <Route element={<ProtectedRoutes allowed={['manager']} />}>
            <Route path="/team" element={<TeamOverview />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/calendar" element={<TeamCalendar />} />
          </Route>
          <Route element={<ProtectedRoutes allowed={['admin']} />}>
            <Route path="/admin" element={<CompanyOverview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<RoleRedirect />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
