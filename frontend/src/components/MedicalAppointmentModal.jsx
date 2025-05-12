import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, FileText, X, CheckCircle, Mail } from 'lucide-react';

/**
 * MedicalAppointmentModal - A reusable medical appointment booking component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility of the modal
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {string} props.primaryColor - Primary color theme (default: "blue")
 * @param {function} props.onSubmit - Optional callback for when form is submitted
 * @param {Object} props.initialData - Optional initial form data
 */
const MedicalAppointmentModal = ({
  isOpen = false,
  onClose = () => {},
  primaryColor = "blue",
  onSubmit = null,
  initialData = {}
}) => {
  // Animation state for the modal
  const [animationClass, setAnimationClass] = useState('scale-90 opacity-0');
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    checkupType: '',
    notes: '',
    ...initialData
  });

  // Handle modal animation
  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation
      setTimeout(() => {
        setAnimationClass('scale-100 opacity-100');
      }, 10);
    } else {
      setAnimationClass('scale-90 opacity-0');
    }
  }, [isOpen]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = () => {
    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Show success state
    setIsSubmitted(true);
    
    // Reset and close after delay
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormStep(0);
      // Reset form if you want to clear data after submission
      // setFormData({name: '', phone: '', email: '', date: '', time: '', checkupType: '', notes: ''});
    }, 2000);
  };

  // Form navigation
  const nextStep = () => setFormStep(prev => prev + 1);
  const prevStep = () => setFormStep(prev => prev - 1);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  // Modal markup
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
         onClick={onClose}>
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitted ? (
          <div className="p-8 text-center animate-fadeIn">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h3>
            <p className="text-gray-600">
              Thank you for scheduling your medical checkup. We'll contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* Header with gradient background */}
              <div className={`bg-gradient-to-r from-${primaryColor}-600 to-${primaryColor}-800 p-6 rounded-t-xl`}>
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-white">Medical Checkup Appointment</h2>
                <p className={`text-${primaryColor}-100 mt-1`}>Schedule your comprehensive health assessment</p>
                
                {/* Progress indicator */}
                <div className="flex justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 0 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>1</div>
                    <div className={`h-1 w-12 ${formStep >= 1 ? 'bg-white' : 'bg-blue-400'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>2</div>
                    <div className={`h-1 w-12 ${formStep >= 2 ? 'bg-white' : 'bg-blue-400'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'}`}>3</div>
                  </div>
                </div>
              </div>
              
              {/* Form Body */}
              <div className="p-6">
                {formStep === 0 && (
                  <div className="space-y-4 animate-slideIn">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
                
                {formStep === 1 && (
                  <div className="space-y-4 animate-slideIn">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
                    
                    <div className="relative">
                      <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="relative">
                      <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      >
                        <option value="">Select Time</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {formStep === 2 && (
                  <div className="space-y-4 animate-slideIn">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Checkup Details</h3>
                    
                    <div className="space-y-2">
                      <label className="text-gray-700 font-medium">Select Checkup Type</label>
                      <select
                        name="checkupType"
                        value={formData.checkupType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a Checkup Type</option>
                        <option value="Basic Health Checkup">Basic Health Checkup</option>
                        <option value="Comprehensive Health Assessment">Comprehensive Health Assessment</option>
                        <option value="Cardiac Evaluation">Cardiac Evaluation</option>
                        <option value="Women's Health Checkup">Women's Health Checkup</option>
                        <option value="Men's Health Checkup">Men's Health Checkup</option>
                        <option value="Senior Citizen Health Package">Senior Citizen Health Package</option>
                        <option value="Full Body Checkup">Full Body Checkup</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-700 font-medium">Additional Notes</label>
                      <div className="relative">
                        <FileText className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Any specific concerns or medical history we should know about?"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Form Navigation */}
                <div className="mt-8 flex justify-between">
                  {formStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-300"
                    >
                      Previous
                    </button>
                  )}
                  
                  {formStep < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className={`ml-auto px-6 py-2 bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white rounded-lg transition-colors duration-300`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className={`ml-auto px-6 py-2 bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white rounded-lg transition-colors duration-300`}
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default MedicalAppointmentModal;