import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, FileText, Stethoscope, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const todayStats = [
    {
      title: 'Today\'s Appointments',
      value: '8',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Patients Treated',
      value: '6',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Pending Reports',
      value: '3',
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Next Appointment',
      value: '2:30 PM',
      icon: Clock,
      color: 'purple'
    }
  ];

  const upcomingAppointments = [
    { time: '2:30 PM', patient: 'John Smith', type: 'Sports Injury Rehabilitation' },
    { time: '3:00 PM', patient: 'Sarah Chandrashekhar', type: 'Manual Therapy' },
    { time: '3:30 PM', patient: 'Mike Wilson', type: 'Orthopedic Physiotherapy' },
    { time: '4:00 PM', patient: 'Emma Davis', type: 'General Consultation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black">
      {/* Header */}
      <header className="bg-white dark:bg-darkBlue-900 shadow-lg border-b border-gray-200 dark:border-darkBlue-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Doctor Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Patient Management System
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-green-200 dark:border-green-800"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-display font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Physiotherapist
                  </p>
                </div>
              </div>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
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
            Good afternoon, {user?.name?.split(' ')[1] || user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
            You have 4 appointments remaining today. Keep up the great work!
          </p>
        </motion.div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 text-primary-500 mr-2" />
              Upcoming Appointments
            </h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-darkBlue-800 dark:to-darkBlue-700 rounded-xl border border-gray-200 dark:border-darkBlue-600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-gray-900 dark:text-white">
                        {appointment.patient}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                        {appointment.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-primary-600 dark:text-primary-400">
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              {[
                { title: 'View Patient Records', desc: 'Access patient history and treatment plans', icon: Users },
                { title: 'Create Treatment Report', desc: 'Document today\'s session outcomes', icon: FileText },
                { title: 'Schedule Follow-up', desc: 'Book next appointment for patients', icon: Calendar },
                { title: 'Update Availability', desc: 'Modify your schedule and time slots', icon: Clock }
              ].map((action, index) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-br from-gray-50 to-white dark:from-darkBlue-800 dark:to-darkBlue-700 rounded-xl border border-gray-200 dark:border-darkBlue-600 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 dark:text-white">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;