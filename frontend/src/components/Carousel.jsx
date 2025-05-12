import React, { useState } from 'react';

const Carousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      title: "Your Health, Our Priority",
      subtitle: "Compassionate Care, Advanced Solutions",
      description: "At Astra Medicare, we blend innovation with personalized healthcare to ensure the best medical outcomes for you and your loved ones.",
      footer: "Your trusted partner in wellness!",
      icon: "💙"
    },
    {
      title: "Comprehensive Healthcare Services",
      subtitle: "Expert Care Across Specialties",
      description: "From General Medicine to Advanced Diagnostics, our team of specialists is here to provide world-class treatment with state-of-the-art facilities.",
      footer: "Quality care, closer to you.",
      icon: "🏥"
    },
    {
      title: "Cutting-Edge Diagnostic & Treatment",
      subtitle: "Precision in Every Diagnosis",
      description: "Our advanced imaging, pathology, and diagnostic services ensure accurate results and timely treatment for better health outcomes.",
      footer: "Trust us for reliable medical solutions.",
      icon: "⚕️"
    },
    {
      title: "Emergency & Critical Care",
      subtitle: "Round-the-Clock Emergency Support",
      description: "When every second counts, our 24/7 emergency care team is ready to provide immediate medical assistance with top-tier facilities.",
      footer: "Your safety is our priority!",
      icon: "🚑"
    },
    {
      title: "Wellness & Preventive Healthcare",
      subtitle: "Stay Healthy, Stay Ahead",
      description: "Regular check-ups, preventive screenings, and holistic wellness programs tailored for a healthier tomorrow.",
      footer: "Astra Medicare – Because Prevention is Better than Cure.",
      icon: "🌿"
    }
  ];

  const duplicatedSlides = [...slides, ...slides];

  return (
    <div
      className="w-full overflow-hidden  py-6"
      aria-live="polite"
      aria-label="Image Carousel"
    >
      <div
        className={`flex gap-6 ${isHovered ? 'animate-none' : 'animate-scroll'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: isHovered ? 'none' : 'scroll 35s linear infinite',
        }}
      >

        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[460px] h-[230px] rounded-2xl bg-gradient-to-r from-[#185fad] to-[#293752] shadow-xl text-[#293752] relative overflow-hidden group transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold drop-shadow-lg text-[#bbbbbb]">{slide.title}</h3>
                  <span className="text-3xl">{slide.icon}</span>
                </div>
                <p className="font-medium opacity-90 text-[#a5bfd0]">{slide.subtitle}</p>
                <p className="text-sm opacity-80 line-clamp-3 text-[#a5bfd0]">{slide.description}</p>
              </div>
              <p className="text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#bbbbbb]">{slide.footer}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-2330px));
          }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
