import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

interface Slide {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: string;
  bgColor: string;
  textColor?: string;
}

const HeaderSlider = () => {
  const sliderData: Slide[] = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: "/headphone.png",
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-100",
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: "/playst.png",
      bgColor: "bg-gradient-to-r from-gray-900 to-black",
      textColor: "text-white",
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: "/mac.png",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-100",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="relative w-full overflow-hidden group">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FiArrowRight className="rotate-180" size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FiArrowRight size={20} />
      </button>

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex flex-col-reverse md:flex-row items-center justify-between ${slide.bgColor} py-12 md:px-16 px-6 rounded-2xl min-w-full`}
          >
            <div className="md:pl-8 mt-10 md:mt-0 md:max-w-md">
              <p className={`md:text-lg text-sm font-semibold ${slide.textColor || 'text-orange-600'} mb-3`}>
                {slide.offer}
              </p>
              <h1 className={`max-w-lg md:text-4xl md:leading-[48px] text-2xl font-bold ${slide.textColor || 'text-gray-900'} mb-6`}>
                {slide.title}
              </h1>
              <div className="flex items-center gap-4">
                <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 rounded-full text-white font-semibold transition-colors shadow-lg">
                  {slide.buttonText1}
                </button>
                <button className={`group flex items-center gap-2 px-6 py-3 font-semibold ${slide.textColor || 'text-gray-700'} hover:text-orange-600 transition-colors`}>
                  {slide.buttonText2}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center flex-1 relative">
              <div className="relative md:w-80 w-56 md:h-72 h-48">
                <Image
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-orange-600 scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;