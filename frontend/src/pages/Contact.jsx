import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ContactInfo />
      <ContactForm />
      <CallToAction />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative bg-blue-800 text-white">
      <div
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg')]"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
      ></div>
      <div className="relative container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-blue-100">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ContactCard
            icon={<Mail className="w-6 h-6" />}
            title="Email Address"
            details={[
              'info@astramedicare.com',
              'support@astramedicare.com'
            ]}
          />
          <ContactCard
            icon={<Phone className="w-6 h-6" />}
            title="Phone Number"
            details={[
              '+91 1234567890',
              '+91 2345678901'
            ]}
          />
          <ContactCard
            icon={<MapPin className="w-6 h-6" />}
            title="Location"
            details={[
              'Astra Medicare Hospital',
              'Plot No. 27, Sector 4, Palm Beach Road',
              'Near Inorbit Mall, Sanpada',
              'Navi Mumbai, Maharashtra – 400705'
            ]}
          />
          <ContactCard
            icon={<Clock className="w-6 h-6" />}
            title="Working Hours"
            details={[
              'Mon - Fri: 8:00 - 20:00',
              'Sat - Sun: 9:00 - 18:00',
              <b>📞 Emergency? Need help anytime?</b>,
              'We’re available 24/7 — because your health can’t wait.'
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, details }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">
        {details.map((detail, index) => (
          <p key={index} className="text-gray-600">{detail}</p>
        ))}
      </div>
    </div>
  );
};

const ContactForm = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch With Us</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-600">
                Have a question or need to schedule an appointment? Fill out the form below and our team will get back to you promptly.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
          <div className="lg:w-1/2">
            <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1792.5743335948396!2d72.99959581561!3d19.065075862210605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c116c44b2e41%3A0xf25d6f87755145ba!2sHaware%20Fantasia%20Business%20Park!5e0!3m2!1sen!2sin!4v1746990003561!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CallToAction = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Your Medical Checkup
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule your complimentary consultation today and take the first step towards better health with AstraMedicare.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;