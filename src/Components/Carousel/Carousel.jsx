import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Carousel.css';

// import required modules
import { Autoplay, Pagination} from 'swiper/modules';
import useIsMobile from '../Hooks/useIsMobile';

export default function Carousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
  };
   const mobile = useIsMobile()
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className="hi">
            <img
             className={` ${activeSlideIndex === 0 ? "fadeInUp" : ""} relative w-full help`}
              src="https://demo-unsen.myshopify.com/cdn/shop/files/slider2_2x_77981a34-fa73-419c-b7e2-e485752cba57.png?v=1661305755&width=1500"
              alt=""
            />
            <div className={` ${activeSlideIndex === 0 ? "fadeInLeft" : ""} absolute md:right-52 md:top-80 right-5 top-10  `}> <h2 className={`text-red-600 ${mobile? 'text-sm ':'text-4xl'}`}>First Deal's Shipping Charge </h2> </div>
            <div className={` ${activeSlideIndex === 0 ? "fadeInRight" : ""} absolute md:right-52 md:top-96 right-5 top-16  `}> <h2 className={`text-red-600 ${mobile? 'text-sm ':'text-4xl'}`}>is Completely free!</h2> </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="hi"> 
        <img
           
            className={` ${activeSlideIndex === 1 ? "fadeInUp" : ""} relative w-full`}
            src="https://demo-unsen.myshopify.com/cdn/shop/files/slider1_2x_52f7c581-93a0-451f-b407-2ebc6d344f38.png?v=1661305527&width=1500"
            alt=""
          />
       <div className={` ${activeSlideIndex === 1 ? "fadeInLeft" : ""} absolute  md:top-80 md:left-44 left-4 top-20 `}> <h2 className={`text-red-600 ${mobile? 'text-sm ':'text-4xl'}`}>Elevate Your Wardrobe with <br /> Our Must-Have Items!</h2></div>
        </div>
          
        </SwiperSlide>
        <SwiperSlide>
          <div className="hi">
          <img
           className={` ${activeSlideIndex === 2 ? "fadeInUp" : ""} relative w-full`}
            src="https://demo-unsen.myshopify.com/cdn/shop/files/slider3_2x_06cc6daf-8ec5-4d11-afe0-6e0fccfec4c2.png?v=1661305755&width=1500"
            alt=""
          />
          <div className={` ${activeSlideIndex === 2 ? "fadeInRight" : ""} absolute md:right-52 md:top-80 right-4 top-20 `}> <h2 className={`text-red-600 ${mobile? 'text-sm ':'text-4xl'}`}>The Best Shope In your Area!</h2></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
