import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Activity, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ManageDoctors from '../doctors/ManageDoctors';
import ViewAppointments from '../appointments/ViewAppointments';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = React.useState('dashboard');

  if (currentView === 'manage-doctors') {
    return <ManageDoctors onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'view-appointments') {
    return <ViewAppointments onBack={() => setCurrentView('dashboard')} />;
  }

  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Appointments Today',
      value: '45',
      change: '+8%',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Revenue This Month',
      value: '₹2,45,000',
      change: '+15%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Active Doctors',
      value: '12',
      change: '+2',
      icon: Activity,
      color: 'orange'
    }
  ];

  const quickActions = [
    { 
      title: 'Manage Doctors', 
      desc: 'Add, edit, or remove doctor profiles', 
      icon: Users, 
      action: () => setCurrentView('manage-doctors') 
    },
    { 
      title: 'View Appointments', 
      desc: 'Check today\'s appointment schedule', 
      icon: Calendar, 
      action: () => setCurrentView('view-appointments') 
    },
    { 
      title: 'System Settings', 
      desc: 'Configure system preferences', 
      icon: Settings 
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black">
      {/* Header */}
      <header className="bg-white dark:bg-darkBlue-900 shadow-lg border-b border-gray-200 dark:border-darkBlue-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  OPHYSIO Management System
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-2 border-primary-200 dark:border-primary-800">
                  <span className="text-white font-display font-bold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-display font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Administrator
                  </p>
                </div>
              </div>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[1] || user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
            Here's what's happening with your physiotherapy clinic today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 px-2 py-1 rounded-full font-sans`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-darkBlue-300 text-sm font-sans">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
        >
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                onClick={action.action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-darkBlue-800 dark:to-darkBlue-700 rounded-xl border border-gray-200 dark:border-darkBlue-600 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-left"
              >
                <action.icon className="w-8 h-8 text-primary-500 mb-3" />
                <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  {action.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;