import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Eye,
  X,
  Clock,
  Activity,
  Heart,
  Stethoscope
} from 'lucide-react';

const ViewPatientRecords = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [viewingPatient, setViewingPatient] = useState(null);

  // Mock patient records data
  const [patients] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+91 98765 43210',
      age: 32,
      gender: 'male',
      dateOfBirth: '1992-03-15',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      emergencyContact: {
        name: 'Jane Smith',
        phone: '+91 98765 43211',
        relation: 'Spouse'
      },
      medicalHistory: ['Lower Back Pain', 'Sports Injury', 'Muscle Strain'],
      currentConditions: ['Chronic Lower Back Pain'],
      allergies: ['None'],
      medications: ['Ibuprofen 400mg', 'Muscle Relaxant'],
      appointments: [
        {
          date: '2024-01-15',
          time: '10:00',
          type: 'consultation',
          status: 'completed',
          notes: 'Initial assessment completed. Patient shows good progress.'
        },
        {
          date: '2024-01-22',
          time: '10:00',
          type: 'follow-up',
          status: 'scheduled',
          notes: 'Follow-up session for treatment evaluation.'
        }
      ],
      treatmentHistory: [
        {
          date: '2024-01-15',
          treatment: 'Manual Therapy',
          duration: 60,
          notes: 'Applied manual therapy techniques for lower back. Patient responded well.',
          nextSession: '2024-01-22'
        }
      ],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '75 kg',
        height: '175 cm',
        lastUpdated: '2024-01-15'
      }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+91 98765 43211',
      age: 28,
      gender: 'female',
      dateOfBirth: '1996-07-22',
      address: '456 Oak Avenue, Delhi, Delhi 110001',
      emergencyContact: {
        name: 'Mike Johnson',
        phone: '+91 98765 43212',
        relation: 'Brother'
      },
      medicalHistory: ['Neck Pain', 'Headaches', 'Posture Issues'],
      currentConditions: ['Cervical Spondylosis'],
      allergies: ['Penicillin'],
      medications: ['Paracetamol 500mg'],
      appointments: [
        {
          date: '2024-01-16',
          time: '11:30',
          type: 'therapy',
          status: 'completed',
          notes: 'Neck mobility exercises performed. Significant improvement noted.'
        }
      ],
      treatmentHistory: [
        {
          date: '2024-01-16',
          treatment: 'Cervical Mobilization',
          duration: 45,
          notes: 'Cervical spine mobilization and strengthening exercises.',
          nextSession: '2024-01-23'
        }
      ],
      vitalSigns: {
        bloodPressure: '115/75',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '62 kg',
        height: '165 cm',
        lastUpdated: '2024-01-16'
      }
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+91 98765 43212',
      age: 45,
      gender: 'male',
      dateOfBirth: '1979-11-08',
      address: '789 Pine Road, Bangalore, Karnataka 560001',
      emergencyContact: {
        name: 'Lisa Wilson',
        phone: '+91 98765 43213',
        relation: 'Wife'
      },
      medicalHistory: ['Knee Injury', 'Arthritis', 'Joint Stiffness'],
      currentConditions: ['Osteoarthritis - Right Knee'],
      allergies: ['Aspirin'],
      medications: ['Glucosamine', 'Chondroitin'],
      appointments: [
        {
          date: '2024-01-17',
          time: '14:00',
          type: 'therapy',
          status: 'in-progress',
          notes: 'Knee strengthening exercises in progress.'
        }
      ],
      treatmentHistory: [
        {
          date: '2024-01-10',
          treatment: 'Knee Rehabilitation',
          duration: 60,
          notes: 'Quadriceps strengthening and range of motion exercises.',
          nextSession: '2024-01-17'
        }
      ],
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: '75 bpm',
        temperature: '98.8°F',
        weight: '82 kg',
        height: '180 cm',
        lastUpdated: '2024-01-17'
      }
    }
  ]);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    
    const matchesCondition = filterCondition === 'all' || 
                            patient.currentConditions.some(condition => 
                              condition.toLowerCase().includes(filterCondition.toLowerCase())
                            );
    
    return matchesSearch && matchesCondition;
  });

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
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Patient Records
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  View and manage patient medical records
                </p>
              </div>
            </div>
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
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans appearance-none"
              >
                <option value="all">All Conditions</option>
                <option value="back pain">Back Pain</option>
                <option value="neck pain">Neck Pain</option>
                <option value="knee">Knee Issues</option>
                <option value="arthritis">Arthritis</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-darkBlue-800"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-4 border-green-200 dark:border-green-800">
                  <span className="text-white font-display font-bold text-xl">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    {patient.age} years old, {patient.gender}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                  <Mail className="w-4 h-4" />
                  <span className="font-sans">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                  <Phone className="w-4 h-4" />
                  <span className="font-sans">{patient.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Current Conditions:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {patient.currentConditions.map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-sans"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {patient.appointments.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Appointments
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {patient.treatmentHistory.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Treatments
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    {patient.medications.length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-darkBlue-300 font-sans">
                    Medications
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setViewingPatient(patient)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-sans text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Record</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="w-16 h-16 text-gray-400 dark:text-darkBlue-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
              No patients found
            </h3>
            <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </main>

      {/* View Patient Modal */}
      <AnimatePresence>
        {viewingPatient && (
          <ViewPatientModal
            patient={viewingPatient}
            onClose={() => setViewingPatient(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// View Patient Modal Component
const ViewPatientModal = ({ patient, onClose }) => {

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
        className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-4 border-green-200 dark:border-green-800">
              <span className="text-white font-display font-bold text-xl">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                {patient.name}
              </h2>
              <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                Patient ID: {patient.id} • {patient.age} years old
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-darkBlue-800 text-gray-600 dark:text-darkBlue-300 hover:bg-gray-200 dark:hover:bg-darkBlue-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Consolidated Patient Information */}
        <div className="space-y-8">
          {/* Personal and Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Date of Birth:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Gender:</span>
                  <span className="text-gray-900 dark:text-white font-sans capitalize">{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Email:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{patient.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Phone:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{patient.phone}</span>
                </div>
                <div className="pt-2">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Address:</span>
                  <p className="text-gray-900 dark:text-white font-sans mt-1">{patient.address}</p>
                </div>
              </div>

              <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                Emergency Contact
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Name:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{patient.emergencyContact.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Phone:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{patient.emergencyContact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-darkBlue-300 font-sans">Relation:</span>
                  <span className="text-gray-900 dark:text-white font-sans">{patient.emergencyContact.relation}</span>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
                Medical Information
              </h3>
              
              <div className="mb-6">
                <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Current Conditions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patient.currentConditions.map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-sans"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Medical History
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory.map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-sans"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Allergies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-sans"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mb-2">
                  Current Medications
                </h4>
                <div className="space-y-2">
                  {patient.medications.map((medication, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 dark:bg-darkBlue-800 rounded-lg">
                      <span className="text-gray-900 dark:text-white font-sans text-sm">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment History */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Appointment History
            </h3>
            <div className="space-y-4">
              {patient.appointments.map((appointment, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-darkBlue-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <span className="font-display font-semibold text-gray-900 dark:text-white">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                      appointment.status === 'completed' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : appointment.status === 'scheduled'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans mb-1">
                    <strong>Type:</strong> {appointment.type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment History */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Treatment History
            </h3>
            <div className="space-y-4">
              {patient.treatmentHistory.map((treatment, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-darkBlue-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-green-500" />
                      <span className="font-display font-semibold text-gray-900 dark:text-white">
                        {treatment.treatment}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                      <Clock className="w-4 h-4" />
                      <span className="font-sans">{treatment.duration} min</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans mb-2">
                    <strong>Date:</strong> {new Date(treatment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans mb-2">
                    <strong>Notes:</strong> {treatment.notes}
                  </p>
                  {treatment.nextSession && (
                    <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                      <strong>Next Session:</strong> {new Date(treatment.nextSession).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewPatientRecords;