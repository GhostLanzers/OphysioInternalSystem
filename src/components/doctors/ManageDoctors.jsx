import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  Users, 
  Calendar,
  Phone,
  Mail,
  GraduationCap,
  Stethoscope,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';

const ManageDoctors = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [viewingDoctor, setViewingDoctor] = useState(null);

  // Mock doctors data
  const [doctors, setDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Chandrashekhar',
      email: 'sarah@ophysio.com',
      phone: '+91 98765 43210',
      specialization: 'Sports Physiotherapy',
      experience: 8,
      qualification: 'MPT, BPT',
      status: 'active',
      joinDate: '2020-03-15',
      schedule: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '13:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false }
      },
      patientsCount: 245,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@ophysio.com',
      phone: '+91 98765 43211',
      specialization: 'Orthopedic Physiotherapy',
      experience: 12,
      qualification: 'PhD, MPT, BPT',
      status: 'active',
      joinDate: '2018-01-10',
      schedule: {
        monday: { start: '08:00', end: '16:00', available: true },
        tuesday: { start: '08:00', end: '16:00', available: true },
        wednesday: { start: '08:00', end: '16:00', available: true },
        thursday: { start: '08:00', end: '16:00', available: true },
        friday: { start: '08:00', end: '16:00', available: true },
        saturday: { start: '00:00', end: '00:00', available: false },
        sunday: { start: '00:00', end: '00:00', available: false }
      },
      patientsCount: 389,
      rating: 4.9
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      email: 'priya@ophysio.com',
      phone: '+91 98765 43212',
      specialization: 'Neurological Physiotherapy',
      experience: 6,
      qualification: 'MPT, BPT',
      status: 'inactive',
      joinDate: '2021-06-20',
      schedule: {
        monday: { start: '10:00', end: '18:00', available: true },
        tuesday: { start: '10:00', end: '18:00', available: true },
        wednesday: { start: '10:00', end: '18:00', available: true },
        thursday: { start: '10:00', end: '18:00', available: true },
        friday: { start: '10:00', end: '18:00', available: true },
        saturday: { start: '10:00', end: '14:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false }
      },
      patientsCount: 156,
      rating: 4.6
    }
  ]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doctor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddDoctor = (formData) => {
    const newDoctor = {
      ...formData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      schedule: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '13:00', available: true },
        sunday: { start: '00:00', end: '00:00', available: false }
      },
      patientsCount: 0,
      rating: 0,
    };
    setDoctors([...doctors, newDoctor]);
    setShowAddForm(false);
  };

  const handleEditDoctor = (formData) => {
    if (editingDoctor) {
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData }
          : doctor
      ));
      setEditingDoctor(null);
    }
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black">
      {/* Header */}
      <header className="bg-white dark:bg-darkBlue-900 shadow-lg border-b border-gray-200 dark:border-darkBlue-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Manage Doctors
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Add, edit, and manage doctor profiles
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setShowAddForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold font-sans"
            >
              <Plus className="w-5 h-5" />
              <span>Add Doctor</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-4 border-primary-200 dark:border-primary-800">
                  <span className="text-white font-display font-bold text-xl">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                      doctor.status === 'active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {doctor.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                  <Mail className="w-4 h-4" />
                  <span className="font-sans">{doctor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                  <Phone className="w-4 h-4" />
                  <span className="font-sans">{doctor.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                  <GraduationCap className="w-4 h-4" />
                  <span className="font-sans">{doctor.qualification}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-lg font-display font-bold text-gray-900 dark:text-white">
                      {doctor.patientsCount}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                      Patients
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-display font-bold text-gray-900 dark:text-white">
                        {doctor.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                      Rating
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display font-semibold text-gray-900 dark:text-white">
                    {doctor.experience} years
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Experience
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  onClick={() => setViewingDoctor(doctor)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-sans text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </motion.button>
                <motion.button
                  onClick={() => setEditingDoctor(doctor)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 px-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors font-sans text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Stethoscope className="w-16 h-16 text-gray-400 dark:text-darkBlue-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </main>

      {/* Add/Edit Doctor Modal */}
      <AnimatePresence>
        {(showAddForm || editingDoctor) && (
          <DoctorFormModal
            doctor={editingDoctor}
            onSave={editingDoctor ? handleEditDoctor : handleAddDoctor}
            onClose={() => {
              setShowAddForm(false);
              setEditingDoctor(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* View Doctor Modal */}
      <AnimatePresence>
        {viewingDoctor && (
          <ViewDoctorModal
            doctor={viewingDoctor}
            onClose={() => setViewingDoctor(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Doctor Form Modal Component
const DoctorFormModal = ({ doctor, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    specialization: doctor?.specialization || '',
    experience: doctor?.experience || 0,
    qualification: doctor?.qualification || '',
    status: doctor?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            {doctor ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Specialization
              </label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              >
                <option value="">Select Specialization</option>
                <option value="Sports Physiotherapy">Sports Physiotherapy</option>
                <option value="Orthopedic Physiotherapy">Orthopedic Physiotherapy</option>
                <option value="Neurological Physiotherapy">Neurological Physiotherapy</option>
                <option value="Pediatric Physiotherapy">Pediatric Physiotherapy</option>
                <option value="Geriatric Physiotherapy">Geriatric Physiotherapy</option>
                <option value="Cardiopulmonary Physiotherapy">Cardiopulmonary Physiotherapy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Qualification
              </label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g., MPT, BPT, PhD"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          <div className="flex space-x-4 pt-6">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 bg-gray-100 dark:bg-darkBlue-800 text-gray-700 dark:text-darkBlue-300 rounded-xl hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors font-semibold font-sans"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold font-sans flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{doctor ? 'Update Doctor' : 'Add Doctor'}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Doctor Modal Component
const ViewDoctorModal = ({ doctor, onClose }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Doctor Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <div className="text-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-4 border-primary-200 dark:border-primary-800 mx-auto mb-4">
                <span className="text-white font-display font-bold text-3xl">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                {doctor.name}
              </h3>
              <p className="text-gray-600 dark:text-darkBlue-300 font-sans mb-2">
                {doctor.specialization}
              </p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium font-sans ${
                doctor.status === 'active' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
                {doctor.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">{doctor.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">{doctor.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">{doctor.qualification}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">
                  Joined {new Date(doctor.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-darkBlue-700">
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  {doctor.experience}
                </p>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Years Exp.
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  {doctor.patientsCount}
                </p>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Patients
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {doctor.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Rating
                </p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-4">
              Weekly Schedule
            </h4>
            <div className="space-y-3">
              {daysOfWeek.map((day) => {
                const schedule = doctor.schedule[day];
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-darkBlue-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        schedule.available 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`} />
                      <span className="font-display font-medium text-gray-900 dark:text-white capitalize">
                        {day}
                      </span>
                    </div>
                    <div className="text-right">
                      {schedule.available ? (
                        <span className="text-gray-900 dark:text-white font-sans">
                          {schedule.start} - {schedule.end}
                        </span>
                      ) : (
                        <span className="text-red-500 font-sans">
                          Not Available
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageDoctors;