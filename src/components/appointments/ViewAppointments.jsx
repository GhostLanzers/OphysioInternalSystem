import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Edit, 
  Eye,
  CreditCard,
  Wallet,
  X,
  Save,
  Plus,
  Trash2
} from 'lucide-react';

const ViewAppointments = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patient: {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+91 98765 43210',
        age: 32,
        gender: 'male',
        medicalHistory: ['Lower Back Pain', 'Sports Injury', 'Muscle Strain']
      },
      doctor: {
        id: '1',
        name: 'Dr. Sarah Chandrashekhar',
        specialization: 'Sports Physiotherapy'
      },
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      type: 'consultation',
      status: 'scheduled',
      reason: 'Lower back pain assessment and treatment planning',
      notes: 'Patient reports chronic lower back pain for 3 months',
      paymentStatus: 'paid-online',
      paymentAmount: 1500,
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-10T09:00:00Z',
      treatmentPlan: 'Initial assessment and manual therapy',
      nextAppointment: '2024-01-22'
    },
    {
      id: '2',
      patient: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+91 98765 43211',
        age: 28,
        gender: 'female',
        medicalHistory: ['Neck Pain', 'Headaches', 'Posture Issues']
      },
      doctor: {
        id: '2',
        name: 'Dr. Rajesh Kumar',
        specialization: 'Orthopedic Physiotherapy'
      },
      date: '2024-01-15',
      time: '11:30',
      duration: 45,
      type: 'follow-up',
      status: 'completed',
      reason: 'Follow-up session for neck pain treatment',
      notes: 'Significant improvement in range of motion',
      paymentStatus: 'pay-on-visit',
      paymentAmount: 1200,
      createdAt: '2024-01-08T14:30:00Z',
      updatedAt: '2024-01-15T11:30:00Z',
      treatmentPlan: 'Continue manual therapy and exercises',
      nextAppointment: '2024-01-29'
    },
    {
      id: '3',
      patient: {
        id: '3',
        name: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        phone: '+91 98765 43212',
        age: 45,
        gender: 'male',
        medicalHistory: ['Knee Injury', 'Arthritis', 'Joint Stiffness']
      },
      doctor: {
        id: '1',
        name: 'Dr. Sarah Chandrashekhar',
        specialization: 'Sports Physiotherapy'
      },
      date: '2024-01-16',
      time: '14:00',
      duration: 60,
      type: 'therapy',
      status: 'in-progress',
      reason: 'Knee rehabilitation therapy session',
      notes: 'Patient showing good progress with exercises',
      paymentStatus: 'paid-online',
      paymentAmount: 1800,
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-16T14:00:00Z',
      treatmentPlan: 'Strengthening exercises and mobility work',
      nextAppointment: '2024-01-23'
    },
    {
      id: '4',
      patient: {
        id: '4',
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        phone: '+91 98765 43213',
        age: 35,
        gender: 'female',
        medicalHistory: ['Shoulder Pain', 'Frozen Shoulder', 'Range of Motion Issues']
      },
      doctor: {
        id: '3',
        name: 'Dr. Priya Sharma',
        specialization: 'Neurological Physiotherapy'
      },
      date: '2024-01-17',
      time: '09:30',
      duration: 45,
      type: 'assessment',
      status: 'scheduled',
      reason: 'Initial assessment for shoulder mobility issues',
      notes: 'New patient referral from orthopedic surgeon',
      paymentStatus: 'pay-on-visit',
      paymentAmount: 1300,
      createdAt: '2024-01-13T11:20:00Z',
      updatedAt: '2024-01-13T11:20:00Z',
      treatmentPlan: 'Comprehensive shoulder assessment',
      nextAppointment: null
    }
  ]);

  // Medical conditions for dropdown
  const medicalConditions = [
    'Lower Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Injury', 'Hip Pain',
    'Sports Injury', 'Muscle Strain', 'Joint Stiffness', 'Arthritis', 'Sciatica',
    'Headaches', 'Posture Issues', 'Frozen Shoulder', 'Tennis Elbow', 'Carpal Tunnel',
    'Ankle Sprain', 'Plantar Fasciitis', 'Whiplash', 'Herniated Disc', 'Scoliosis',
    'Fibromyalgia', 'Chronic Pain', 'Post-Surgery Rehabilitation', 'Stroke Recovery',
    'Parkinson\'s Disease', 'Multiple Sclerosis', 'Spinal Cord Injury', 'Balance Issues',
    'Vertigo', 'TMJ Disorder', 'Rotator Cuff Injury', 'ACL Injury', 'Meniscus Tear',
    'Osteoporosis', 'Rheumatoid Arthritis', 'Bursitis', 'Tendonitis', 'Ligament Sprain',
    'Muscle Weakness', 'Coordination Problems', 'Gait Abnormalities', 'Breathing Issues',
    'Pelvic Floor Dysfunction', 'Pregnancy-related Pain', 'Pediatric Conditions',
    'Developmental Delays', 'Cerebral Palsy', 'Autism Spectrum Disorders', 'ADHD',
    'Learning Disabilities', 'Sensory Processing Issues', 'Range of Motion Issues'
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDoctor = filterDoctor === 'all' || appointment.doctor.id === filterDoctor;
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    return matchesSearch && matchesDate && matchesStatus && matchesDoctor && matchesType;
  });

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    ));
    setEditingAppointment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'in-progress': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'no-show': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'follow-up': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400';
      case 'therapy': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'assessment': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
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
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  View Appointments
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Manage and track patient appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              />
            </div>

            <div>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans appearance-none"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            <div>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              >
                <option value="all">All Doctors</option>
                <option value="1">Dr. Sarah Chandrashekhar</option>
                <option value="2">Dr. Rajesh Kumar</option>
                <option value="3">Dr. Priya Sharma</option>
              </select>
            </div>

            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              >
                <option value="all">All Types</option>
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="therapy">Therapy</option>
                <option value="assessment">Assessment</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center border-2 border-primary-200 dark:border-primary-800">
                    <span className="text-white font-display font-bold text-sm">
                      {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                      {appointment.patient.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                      {appointment.doctor.name} • {appointment.doctor.specialization}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-darkBlue-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-sans">{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-sans">{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {appointment.paymentStatus === 'paid-online' ? (
                        <CreditCard className="w-4 h-4 text-green-500" />
                      ) : (
                        <Wallet className="w-4 h-4 text-orange-500" />
                      )}
                      <span className="font-sans">₹{appointment.paymentAmount}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => setViewingAppointment(appointment)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setEditingAppointment(appointment)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-darkBlue-700">
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans mb-2">
                  <strong>Reason:</strong> {appointment.reason}
                </p>
                {appointment.patient.medicalHistory && appointment.patient.medicalHistory.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {appointment.patient.medicalHistory.map((condition, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-darkBlue-800 text-gray-700 dark:text-darkBlue-300 rounded-full text-xs font-sans"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-gray-400 dark:text-darkBlue-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
              No appointments found
            </h3>
            <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </main>

      {/* Edit Appointment Modal */}
      <AnimatePresence>
        {editingAppointment && (
          <EditAppointmentModal
            appointment={editingAppointment}
            medicalConditions={medicalConditions}
            onSave={handleUpdateAppointment}
            onClose={() => setEditingAppointment(null)}
          />
        )}
      </AnimatePresence>

      {/* View Appointment Modal */}
      <AnimatePresence>
        {viewingAppointment && (
          <ViewAppointmentModal
            appointment={viewingAppointment}
            onClose={() => setViewingAppointment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Edit Appointment Modal Component
const EditAppointmentModal = ({ appointment, medicalConditions, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    patient: { ...appointment.patient },
    doctor: { ...appointment.doctor },
    date: appointment.date,
    time: appointment.time,
    duration: appointment.duration,
    type: appointment.type,
    status: appointment.status,
    reason: appointment.reason,
    notes: appointment.notes || '',
    paymentStatus: appointment.paymentStatus,
    paymentAmount: appointment.paymentAmount,
    treatmentPlan: appointment.treatmentPlan || '',
    nextAppointment: appointment.nextAppointment || ''
  });

  const [selectedCondition, setSelectedCondition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAppointment = {
      ...appointment,
      ...formData,
      updatedAt: new Date().toISOString()
    };
    onSave(updatedAppointment);
  };

  const addMedicalCondition = () => {
    if (selectedCondition && !formData.patient.medicalHistory.includes(selectedCondition)) {
      setFormData({
        ...formData,
        patient: {
          ...formData.patient,
          medicalHistory: [...formData.patient.medicalHistory, selectedCondition]
        }
      });
      setSelectedCondition('');
    }
  };

  const removeMedicalCondition = (condition) => {
    setFormData({
      ...formData,
      patient: {
        ...formData.patient,
        medicalHistory: formData.patient.medicalHistory.filter(c => c !== condition)
      }
    });
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
        className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Edit Appointment
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patient.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    patient: { ...formData.patient, name: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.patient.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    patient: { ...formData.patient, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.patient.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    patient: { ...formData.patient, phone: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.patient.age}
                  onChange={(e) => setFormData({
                    ...formData,
                    patient: { ...formData.patient, age: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Gender
                </label>
                <select
                  value={formData.patient.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    patient: { ...formData.patient, gender: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Medical History */}
            <div className="mt-6">
              <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                Medical History
              </label>
              <div className="flex space-x-2 mb-3">
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                >
                  <option value="">Select a medical condition</option>
                  {medicalConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  onClick={addMedicalCondition}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.patient.medicalHistory.map((condition, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-sans"
                  >
                    <span>{condition}</span>
                    <button
                      type="button"
                      onClick={() => removeMedicalCondition(condition)}
                      className="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="15"
                  max="180"
                  step="15"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="therapy">Therapy</option>
                  <option value="assessment">Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                >
                  <option value="paid-online">Paid Online</option>
                  <option value="pay-on-visit">Pay on Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.paymentAmount}
                  onChange={(e) => setFormData({ ...formData, paymentAmount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans resize-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Treatment Plan
                </label>
                <textarea
                  value={formData.treatmentPlan}
                  onChange={(e) => setFormData({ ...formData, treatmentPlan: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Next Appointment Date
                </label>
                <input
                  type="date"
                  value={formData.nextAppointment}
                  onChange={(e) => setFormData({ ...formData, nextAppointment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                />
              </div>
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
              <span>Save Changes</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Appointment Modal Component
const ViewAppointmentModal = ({ appointment, onClose }) => {
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
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Patient Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <div>
                  <p className="font-display font-medium text-gray-900 dark:text-white">
                    {appointment.patient.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    {appointment.patient.age} years old, {appointment.patient.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">
                  {appointment.patient.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">
                  {appointment.patient.phone}
                </span>
              </div>
            </div>

            {appointment.patient.medicalHistory && appointment.patient.medicalHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="font-display font-medium text-gray-900 dark:text-white mb-2">
                  Medical History
                </h4>
                <div className="flex flex-wrap gap-2">
                  {appointment.patient.medicalHistory.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-sans"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Appointment Information */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Appointment Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <span className="text-gray-900 dark:text-white font-sans">
                  {appointment.duration} minutes
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                <div>
                  <p className="font-display font-medium text-gray-900 dark:text-white">
                    {appointment.doctor.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    {appointment.doctor.specialization}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {appointment.paymentStatus === 'paid-online' ? (
                  <CreditCard className="w-5 h-5 text-green-500" />
                ) : (
                  <Wallet className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <p className="font-display font-medium text-gray-900 dark:text-white">
                    ₹{appointment.paymentAmount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    {appointment.paymentStatus === 'paid-online' ? 'Paid Online' : 'Pay on Visit'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-darkBlue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-display font-medium text-gray-900 dark:text-white mb-2">
                Reason for Visit
              </h4>
              <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                {appointment.reason}
              </p>
            </div>
            {appointment.notes && (
              <div>
                <h4 className="font-display font-medium text-gray-900 dark:text-white mb-2">
                  Notes
                </h4>
                <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                  {appointment.notes}
                </p>
              </div>
            )}
            {appointment.treatmentPlan && (
              <div>
                <h4 className="font-display font-medium text-gray-900 dark:text-white mb-2">
                  Treatment Plan
                </h4>
                <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                  {appointment.treatmentPlan}
                </p>
              </div>
            )}
            {appointment.nextAppointment && (
              <div>
                <h4 className="font-display font-medium text-gray-900 dark:text-white mb-2">
                  Next Appointment
                </h4>
                <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                  {new Date(appointment.nextAppointment).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewAppointments;