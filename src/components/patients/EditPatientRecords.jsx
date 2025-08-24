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
  Edit,
  X,
  Clock,
  Stethoscope,
  Save,
  Plus,
  Trash2,
  CheckCircle
} from 'lucide-react';

const EditPatientRecords = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [editingPatient, setEditingPatient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock patient records data
  const [patients, setPatients] = useState([
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
      ]
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
      ]
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
      ]
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

  const handleUpdatePatient = async (updatedPatient) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPatients(patients.map(patient => 
      patient.id === updatedPatient.id ? updatedPatient : patient
    ));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEditingPatient(null);

    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-darkBlue-900 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-darkBlue-800 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Patient Record Updated!
          </h2>
          <p className="text-gray-600 dark:text-darkBlue-300 font-sans mb-6">
            The patient record has been successfully updated with the new information.
          </p>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold font-sans"
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
                <Edit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  Edit Patient Records
                </h1>
                <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                  Update patient information and medical records
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
                onClick={() => setEditingPatient(patient)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-sans text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Record</span>
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

      {/* Edit Patient Modal */}
      <AnimatePresence>
        {editingPatient && (
          <EditPatientModal
            patient={editingPatient}
            medicalConditions={medicalConditions}
            onSave={handleUpdatePatient}
            onClose={() => setEditingPatient(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Edit Patient Modal Component
const EditPatientModal = ({ patient, medicalConditions, onSave, onClose, isSubmitting }) => {
  const [formData, setFormData] = useState({
    ...patient,
    emergencyContact: { ...patient.emergencyContact }
  });

  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedAllergy, setSelectedAllergy] = useState('');
  const [selectedMedication, setSelectedMedication] = useState('');
  const [newTreatment, setNewTreatment] = useState({
    date: '',
    treatment: '',
    duration: 60,
    notes: '',
    nextSession: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addMedicalCondition = () => {
    if (selectedCondition && !formData.medicalHistory.includes(selectedCondition)) {
      setFormData({
        ...formData,
        medicalHistory: [...formData.medicalHistory, selectedCondition]
      });
      setSelectedCondition('');
    }
  };

  const removeMedicalCondition = (condition) => {
    setFormData({
      ...formData,
      medicalHistory: formData.medicalHistory.filter(c => c !== condition)
    });
  };

  const addCurrentCondition = () => {
    if (selectedCondition && !formData.currentConditions.includes(selectedCondition)) {
      setFormData({
        ...formData,
        currentConditions: [...formData.currentConditions, selectedCondition]
      });
      setSelectedCondition('');
    }
  };

  const removeCurrentCondition = (condition) => {
    setFormData({
      ...formData,
      currentConditions: formData.currentConditions.filter(c => c !== condition)
    });
  };

  const addAllergy = () => {
    if (selectedAllergy && !formData.allergies.includes(selectedAllergy)) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, selectedAllergy]
      });
      setSelectedAllergy('');
    }
  };

  const removeAllergy = (allergy) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter(a => a !== allergy)
    });
  };

  const addMedication = () => {
    if (selectedMedication && !formData.medications.includes(selectedMedication)) {
      setFormData({
        ...formData,
        medications: [...formData.medications, selectedMedication]
      });
      setSelectedMedication('');
    }
  };

  const removeMedication = (medication) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter(m => m !== medication)
    });
  };

  const addTreatment = () => {
    if (newTreatment.date && newTreatment.treatment) {
      setFormData({
        ...formData,
        treatmentHistory: [...formData.treatmentHistory, { ...newTreatment }]
      });
      setNewTreatment({
        date: '',
        treatment: '',
        duration: 60,
        notes: '',
        nextSession: ''
      });
    }
  };

  const removeTreatment = (index) => {
    setFormData({
      ...formData,
      treatmentHistory: formData.treatmentHistory.filter((_, i) => i !== index)
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
        className="bg-white dark:bg-darkBlue-900 rounded-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-4 border-green-200 dark:border-green-800">
              <span className="text-white font-display font-bold text-xl">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Edit Patient Record
              </h2>
              <p className="text-gray-600 dark:text-darkBlue-300 font-sans">
                Patient ID: {formData.id} • Update patient information
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal and Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans resize-none"
                    required
                  />
                </div>

                <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                      Relation
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relation}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, relation: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
                Medical Information
              </h3>
              
              {/* Current Conditions */}
              <div className="mb-6">
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Current Conditions
                </label>
                <div className="flex space-x-2 mb-3">
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  >
                    <option value="">Select a condition</option>
                    {medicalConditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    type="button"
                    onClick={addCurrentCondition}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.currentConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-sans"
                    >
                      <span>{condition}</span>
                      <button
                        type="button"
                        onClick={() => removeCurrentCondition(condition)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-6">
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Medical History
                </label>
                <div className="flex space-x-2 mb-3">
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  >
                    <option value="">Select a condition</option>
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
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalHistory.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-sans"
                    >
                      <span>{condition}</span>
                      <button
                        type="button"
                        onClick={() => removeMedicalCondition(condition)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div className="mb-6">
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Allergies
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={selectedAllergy}
                    onChange={(e) => setSelectedAllergy(e.target.value)}
                    placeholder="Enter allergy..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  />
                  <motion.button
                    type="button"
                    onClick={addAllergy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-sans"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        onClick={() => removeAllergy(allergy)}
                        className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Current Medications
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={selectedMedication}
                    onChange={(e) => setSelectedMedication(e.target.value)}
                    placeholder="Enter medication..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                  />
                  <motion.button
                    type="button"
                    onClick={addMedication}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {formData.medications.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-darkBlue-800 rounded-lg">
                      <span className="text-gray-900 dark:text-white font-sans text-sm">{medication}</span>
                      <button
                        type="button"
                        onClick={() => removeMedication(medication)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Treatment History */}
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">
              Treatment History
            </h3>
            
            {/* Add New Treatment */}
            <div className="bg-gray-50 dark:bg-darkBlue-800 rounded-xl p-4 mb-4">
              <h4 className="text-md font-display font-semibold text-gray-900 dark:text-white mb-3">
                Add New Treatment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="date"
                    value={newTreatment.date}
                    onChange={(e) => setNewTreatment({ ...newTreatment, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkBlue-700 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newTreatment.treatment}
                    onChange={(e) => setNewTreatment({ ...newTreatment, treatment: e.target.value })}
                    placeholder="Treatment type..."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkBlue-700 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans text-sm"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={newTreatment.duration}
                    onChange={(e) => setNewTreatment({ ...newTreatment, duration: parseInt(e.target.value) || 60 })}
                    placeholder="Duration (min)"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkBlue-700 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans text-sm"
                  />
                </div>
                <div>
                  <motion.button
                    type="button"
                    onClick={addTreatment}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-sans"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </motion.button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <input
                    type="text"
                    value={newTreatment.notes}
                    onChange={(e) => setNewTreatment({ ...newTreatment, notes: e.target.value })}
                    placeholder="Treatment notes..."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkBlue-700 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans text-sm"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={newTreatment.nextSession}
                    onChange={(e) => setNewTreatment({ ...newTreatment, nextSession: e.target.value })}
                    placeholder="Next session date"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkBlue-700 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Existing Treatments */}
            <div className="space-y-3">
              {formData.treatmentHistory.map((treatment, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-darkBlue-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-green-500" />
                      <span className="font-display font-semibold text-gray-900 dark:text-white">
                        {treatment.treatment}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-darkBlue-300">
                        <Clock className="w-4 h-4" />
                        <span className="font-sans">{treatment.duration} min</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTreatment(idx)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold font-sans disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating Record...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Patient Record</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditPatientRecords;