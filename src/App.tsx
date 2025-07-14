import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RoleSelection from './components/auth/RoleSelection';
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'doctor' | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-darkBlue-300 font-sans">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return user.role === 'admin' ? <AdminDashboard /> : <DoctorDashboard />;
  }

  if (selectedRole) {
    return (
      <LoginForm 
        role={selectedRole} 
        onBack={() => setSelectedRole(null)} 
      />
    );
  }

  return <RoleSelection onRoleSelect={setSelectedRole} />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-darkBlue-950 transition-colors duration-300 overflow-x-hidden w-full max-w-full">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;