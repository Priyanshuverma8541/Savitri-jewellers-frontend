import React from "react";

const Services = () => {
  const services = [
    {
      title: "Custom Jewelry Design",
      description:
        "Our experts craft personalized jewelry as per your unique style and preference.",
      icon: "💎",
    },
    {
      title: "Online Order & Delivery",
      description:
        "Seamless online purchasing experience with secure payment and doorstep delivery.",
      icon: "📦",
    },
    {
      title: "Virtual Try-On & Consultation",
      description:
        "Experience our jewelry virtually before purchasing and get expert consultation.",
      icon: "🖥️",
    },
    {
      title: "Store Visit & Booking",
      description:
        "Book an appointment at our stores in Buxar & Varanasi for a personalized experience.",
      icon: "🏬",
    },
    {
      title: "Repair & Polishing Services",
      description:
        "We offer professional jewelry repair, resizing, and polishing services.",
      icon: "🔧",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Jewelry Services
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Offering premium services for our customers in Buxar, Bihar & Varanasi, UP.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center transform hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
