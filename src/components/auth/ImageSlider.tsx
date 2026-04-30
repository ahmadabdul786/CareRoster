'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Slide {
  id: number;
  image: string;
  heading: string;
  description: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

export function ImageSlider({ slides }: ImageSliderProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: false,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute left-4 sm:left-8 lg:left-[37px] bottom-16 sm:bottom-20 lg:bottom-[92px] z-20">
        <ul className="flex items-center justify-start gap-[6px] m-0 p-0 list-none">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button 
        className="w-[8px] h-[8px] rounded-full bg-white/50 border-0 cursor-pointer transition-all duration-300 ease-in-out p-0 block hover:bg-white/75" 
        aria-label="Go to slide" 
      />
    ),
  };

  if (slides.length === 0) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-lg px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Welcome</h2>
          <p className="text-base sm:text-lg text-white/90">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full lg:min-h-screen auth-slider">
      <style jsx global>{`
        .auth-slider .slick-active button {
          width: 32px !important;
          background-color: rgba(255, 255, 255, 1) !important;
        }
      `}</style>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative lg:min-h-screen">
            {/* Slide Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            />
            
            {/* Text Overlay Container - Responsive positioning */}
            <div className="absolute left-4 right-4 sm:left-8 sm:right-8 lg:left-[37px] lg:right-auto bottom-32 sm:bottom-36 lg:bottom-[180px] lg:w-[558px] flex flex-col items-center">
              {/* Heading */}
              <div className="w-full mb-3 sm:mb-4">
                <h2 
                  className="text-white font-semibold text-center text-xl sm:text-2xl lg:text-[32px] lg:leading-[35px]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {slide.heading}
                </h2>
              </div>
              
              {/* Description */}
              <div className="w-full">
                <p 
                  className="text-white/90 text-center text-sm sm:text-base lg:text-[16px] lg:leading-[100%]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400
                  }}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
