'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography } from '../shared/typography';

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
        .auth-slider {
          height: 100%;
        }
        .auth-slider .slick-slider {
          position: relative;
          height: 100%;
        }
        .auth-slider .slick-slider,
        .auth-slider .slick-list,
        .auth-slider .slick-track,
        .auth-slider .slick-slide,
        .auth-slider .slick-slide > div {
          height: 100% !important;
        }
        .auth-slider .slick-dots {
          position: absolute;
          left: 16px;
          bottom: 64px;
          display: flex !important;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
          margin: 0;
          padding: 0;
        }
        .auth-slider .slick-dots li {
          margin: 0;
        }
        @media (min-width: 640px) {
          .auth-slider .slick-dots {
            left: 32px;
            bottom: 80px;
          }
        }
        @media (min-width: 1024px) {
          .auth-slider .slick-dots {
          margin: 0px auto !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 92px !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 20px !important;
          box-sizing: border-box !important;
          text-align: center !important;
          }
        }

           .auth-slider .slick-dots {
          margin: 0px auto !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 120px !important;
          width: 2% !important;
          padding: 0 0px !important;
          box-sizing: border-box !important;
          text-align: center !important;
          }
           .slick-dots li button:before {
         color: #000 !important;
           gap: 20px;
        }
        .slick-dots li.slick-active button:before {
        background-color:rgba(255, 255, 255, 0.5) !important;
         display: none !important;
        }
        .auth-slider .slick-active button {
        margin: 5px 0px !important;
          width: 40px !important;
          height: 8px !important;
          background-color: var(--white) !important;
        }
      `}</style>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-full">
            {/* Slide Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            />
            
            {/* Text Overlay Container - Responsive positioning */}
            <div className="absolute sm:bottom-36 lg:bottom-[180px] w-full left-0 right-0 mx-auto flex flex-col items-center  xl:px-10 px-5">
              {/* Heading */}
              <div className="w-full mb-3 sm:mb-4">
                <Typography as="h2" size="h2" className="text-white font-semibold text-center text-xl sm:text-2xl lg:text-[32px]">
                  {slide.heading}
                </Typography>
              </div>
              
              {/* Description */}
              <div className="w-full">
                  <Typography as="p" size="lg" className="text-white/90 text-center"> 
                    {slide.description}
                  </Typography>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
