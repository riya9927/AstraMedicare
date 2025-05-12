import React from 'react';
import { 
  Stethoscope, ChevronLeft, ChevronRight, Quote, Heart, Shield, 
  BookOpen, Users, UserPlus, Building, ShieldCheck, Award, 
  Lightbulb, Users2, Building2, Activity, HeartPulse 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';


const About = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <Mission />
      <Values />
      <Statistics />
      <WhyChooseUs />
      <Legacy />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative bg-blue-800 text-white">
      <div 
        className="absolute inset-0 bg-[url('https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg')]"
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
      ></div>
      <div className="relative container mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-start space-y-4 max-w-3xl">
          <div className="flex items-center space-x-2 bg-blue-700 bg-opacity-80 px-4 py-2 rounded-full">
            <Stethoscope size={20} className="text-blue-200" />
            <span className="text-blue-100 font-medium">AstraMedicare</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            ABOUT US
          </h1>
          <div className="w-20 h-1 bg-blue-400 my-4"></div>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            At AstraMedicare, we're not just a hospital — we're a destination for healing, hope, and innovation. From your very first visit to your full recovery, we walk with you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Section */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
               WE ARE <span className="text-blue-700">THE TRUSTED EXPERTS</span>
              </h2>
              <div className="w-24 h-1 bg-blue-600 mt-3 rounded-full"></div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              We are a state-of-the-art, multi-specialty hospital driven by one simple belief:
              <span className="block mt-3 text-gray-900 font-medium italic">
                Healthcare should heal more than the body — it should care for the person.
              </span>
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              With top-tier doctors, modern technology, and a patient-first mindset, we combine
              clinical excellence with a warm, human touch.
            </p>

            <div className="pt-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105">
              <img
                src={assets.about_image}
                alt="Medical professionals at AstraMedicare"
                className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Mission = () => {
  return (
    <div className="bg-white ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MissionItem 
            icon={<Heart className="w-10 h-10 text-blue-600" />}
            title="Patient Well-being"
            description="To prioritize patient well-being with safe, ethical, and evidence-based medical care"
          />
          <MissionItem 
            icon={<Shield className="w-10 h-10 text-blue-600" />}
            title="Healing Environment"
            description="To foster a healing environment where empathy and dignity define every interaction"
          />
          <MissionItem 
            icon={<BookOpen className="w-10 h-10 text-blue-600" />}
            title="Healthcare Advancement"
            description="To advance healthcare through continuous innovation, research, and education"
          />
        </div>
      </div>
    </div>
  );
};

const MissionItem = ({ icon, title, description }) => {
  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:bg-blue-100">
      <div className="bg-white p-4 rounded-full shadow-md mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-blue-800 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Values = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
          Our Values
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          
          <ValueItem 
            icon={<Heart className="w-14 h-14 text-blue-600" />}
            title="Compassion"
            description="Caring for patients and their families with empathy"
          />
          
          <ValueItem 
            icon={<ShieldCheck className="w-14 h-14 text-blue-600" />}
            title="Integrity"
            description="Maintaining the highest ethical standards in everything we do"
          />
          
          <ValueItem 
            icon={<Award className="w-14 h-14 text-blue-600" />}
            title="Excellence"
            description="Constantly striving for medical and service excellence"
          />
          
          <ValueItem 
            icon={<Lightbulb className="w-14 h-14 text-blue-600" />}
            title="Innovation"
            description="Adopting new technologies and practices for better outcomes"
          />
          
          <ValueItem 
            icon={<Users className="w-14 h-14 text-blue-600" />}
            title="Teamwork"
            description="Collaborating across disciplines for holistic healing"
          />
          
          
        </div>
      </div>
    </div>
  );
};

const ValueItem = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
      <div className="mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem 
            icon={<Building className="w-12 h-12 text-blue-500" />}
            number="15+"
            label="YEARS OF EXCELLENCE"
          />
          <StatItem 
            icon={<Users className="w-12 h-12 text-blue-500" />}
            number="5000+"
            label="PATIENTS SERVED"
          />
          <StatItem 
            icon={<UserPlus className="w-12 h-12 text-blue-500" />}
            number="50+"
            label="SPECIALIST DOCTORS"
          />
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, number, label }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-blue-700 mb-2">{number}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="bg-blue-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Choose AstraMedicare?</h2>
            <div className="w-20 h-1 bg-blue-300 mb-8"></div>
            
            <div className="space-y-8">
              <FeatureItem 
                icon={<Users2 size={24} />}
                title="Expert Medical Team"
                description="Board-certified doctors, skilled surgeons, and compassionate nursing staff dedicated to your health"
              />
              
              <FeatureItem 
                icon={<Building2 size={24} />}
                title="State-of-the-Art Facilities"
                description="Advanced diagnostic tools, modular operating theatres, ICU units, and emergency care"
              />
              
              <FeatureItem 
                icon={<Activity size={24} />}
                title="Comprehensive Services"
                description="From general medicine to specialized surgeries, maternity, diagnostics, and rehabilitation"
              />
              
              <FeatureItem 
                icon={<HeartPulse size={24} />}
                title="Patient-Centric Care"
                description="Personalized treatment plans, transparent communication, and round-the-clock support"
              />
              
              <FeatureItem 
                icon={<ShieldCheck size={24} />}
                title="Commitment to Safety"
                description="International protocols and hygiene standards for infection control and clinical excellence"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 flex items-center">
            <img 
              src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg" 
              alt="Modern hospital facilities" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-blue-100">{description}</p>
      </div>
    </div>
  );
};

const Legacy = () => {
  const navigate = useNavigate();

  // Sample Testimonials
  const testimonials = [
    { quote: "The care I received was beyond my expectations. The doctors actually listened to me.", author: "Anjali M., Mumbai" },
    { quote: "AstraMedicare made me feel safe during my surgery — from admission to discharge.", author: "Rahul V., Pune" },
    { quote: "I felt like I was in the best hands throughout my recovery.", author: "Priya S., Delhi" },
    { quote: "The team was professional and caring. My experience was excellent.", author: "Sandeep K., Bangalore" },
    { quote: "Thank you for providing exceptional care. I'm grateful for the support I received.", author: "Neha R., Chennai" },
    { quote: "AstraMedicare gave me a new lease on life. Their care was unmatched.", author: "Vikram P., Hyderabad" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next set of testimonials
  const nextTestimonials = () => {
    if (currentIndex + 2 < testimonials.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  // Function to go to the previous set of testimonials
  const prevTestimonials = () => {
    if (currentIndex - 2 >= 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            A Legacy of Care
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 mb-8"></div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Every life we touch becomes part of the AstraMedicare story. From critical cases to routine checkups, we go beyond medicine — we build relationships, restore lives, and help our patients thrive.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-blue-600 text-white p-10 md:p-16">
              <h3 className="text-2xl font-bold mb-6">Hear from Our Patients</h3>
              <div className="space-y-8">
                {/* Display two testimonials at a time */}
                {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
                  <Testimonial 
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                  />
                ))}
              </div>
              <div className="flex space-x-4 mt-10">
                <button 
                  onClick={prevTestimonials}
                  className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextTestimonials}
                  className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 transition-colors"
                  disabled={currentIndex + 2 >= testimonials.length}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="h-full">
                <img 
                  src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg" 
                  alt="Happy patient with doctor" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button onClick={() => navigate('/doctors')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg">
            Schedule an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

const Testimonial = ({ quote, author }) => {
  return (
    <div className="relative pl-10">
      <Quote className="absolute left-0 top-0 w-6 h-6 text-blue-300" />
      <p className="text-lg font-medium italic mb-2">{quote}</p>
      <p className="text-blue-200">— {author}</p>
    </div>
  );
};

export default About;