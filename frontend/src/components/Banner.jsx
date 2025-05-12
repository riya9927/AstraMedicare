import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import MedicalAppointmentModal from '../components/MedicalAppointmentModal';

const Banner = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentSubmit = (formData) => {
    console.log("Appointment data:", formData);
    // Here you would send the data to your backend/API
  };

  return (
    <div className="relative flex flex-col-reverse md:flex-row bg-[#185fad] rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 py-10 md:py-16 my-20 mx-4 md:mx-10 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#a5bfd0] leading-tight">
          Your Health, Your Priority
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[#a4cff0] font-medium">
          100+ Experts, One Click Away!
        </p>
        <p className="text-blue-100 mt-6 max-w-xl">
          Schedule your complimentary consultation today and take the first step
          towards better health with AstraMedicare.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="bg-[#a4cff0] text-[#293752] font-semibold px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base hover:scale-105 hover:bg-[#bcdfff] transition-transform duration-300 shadow-md"
          >
            Get Started Now
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base hover:bg-blue-50 transition duration-300 shadow-md"
          >
            Book an Appointment
          </button>
        </div>

        <MedicalAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryColor="blue"
          onSubmit={handleAppointmentSubmit}
        />
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 lg:w-[370px] flex justify-center md:justify-end mb-8 md:mb-0 animate-slideIn">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full md:h-full object-cover object-right-bottom rounded-lg drop-shadow-lg"
        />
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-6 left-6 w-12 h-12 bg-[#a4cff0] opacity-40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 right-6 w-20 h-20 bg-[#bbbbbb] opacity-20 rounded-full animate-bounce"></div>
    </div>
  );
};

export default Banner;
