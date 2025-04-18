

import React, { useEffect, useState } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: "ai-generated-8036196_1920.jpg",
            title: "TimeCrafted",
            description: "Timeless beauty with a contemporary twist",
        },
        {
            src: "pexels-the-glorious-studio-3584518-10976653.jpg",
            title: "Gold Jewels",
            description: "Delighted customers change their old gold to new",
        },
        {
            src: "pexels-castorlystock-3641056.jpg",
            title: "NEW ARRIVAL",
            description: "Check our latest jewelry designs",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div>
            {/* Carousel Section */}
            <div className="relative overflow-hidden">
                <div className="carousel relative w-full h-96">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-transform duration-700 ${currentSlide === index ? "translate-x-0" : "translate-x-full"} ${currentSlide === index - 1 || (index === 0 && currentSlide === slides.length - 1) ? "-translate-x-full" : ""}`}
                            style={{
                                transform: `translateX(${(index - currentSlide) * 100}%)`,
                            }}
                        >
                            <img
                                className="block w-full h-full object-cover"
                                src={slide.src}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white">
                                <h5 className="text-2xl font-bold">{slide.title}</h5>
                                <p className="mt-2">{slide.description}</p>
                                <button
                                    className="mt-3 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                                    onClick={() => alert('Button Clicked!')}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-yellow-500" : "bg-gray-400"}`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div> // Closing div for the main container
    );
};

export default Slider;
