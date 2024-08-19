import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import useData from "../../Hooks/useData";
import Card from "../../Shared/Cards/Card";
import { Link } from "react-router-dom";
import { ShoppingBagOutlined } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import useIsMobile from "../../Hooks/useIsMobile";

export default function PopulerProducts({ category }) {
  console.log(category)
  const [data] = useData();
  const similerProducts = data.filter((items) => items.category == category);
  const mobile = useIsMobile();
  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        // scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={10}
        breakpoints={{
          // Configure different settings for different screen sizes
          640: {
            slidesPerView: 2, // Show two slides on screens wider than 640px
          },
          768: {
            slidesPerView: 3, // Show three slides on screens wider than 768px
          },
          1024: {
            slidesPerView: 4, // Show five slides on screens wider than 1024px
          },
        }}
      >
        {similerProducts.map((items) => (
          <SwiperSlide key={items.id}>
     <div className="flex justify-center">
     {mobile ? (
             <Link to={`mobile/details/${items._id}`} state={{ data: items }}>
              <div
                className="
    group
    inline-block p-3 overflow-hidden rounded-2xl shadow
    hover:shadow-md
    transition
  "
              >
                <figure className=" aspect-square overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition group-hover:scale-125"
                    src={items.img}
                  />
                </figure>
                <div className="p-1 mt-6 ">
                 <div className="-mt-5">
                 <span className="text-xl  font-bold">{items.title}</span>
                  <h5 className="text-yellow-400 mt-2">{items.price} $</h5>
                 </div>
                
                </div>
              </div>
             </Link>
            ) : (
              <Link to={`products/details/${items._id}`} state={{ data: items }}>
              <div className="ml-14 w-60 bg-white shadow-lg hover:shadow-2xl rounded-2xl transition-shadow duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={items.img}
                    alt="Product"
                    className="h-80 w-full object-cover hover:scale-110 transform transition-transform duration-500"
                  />
                </div>
                <div className="px-4 py-5 bg-gray-50 rounded-b-2xl">
                  <h2 className="text-gray-800 font-extrabold uppercase text-lg truncate">
                    {items.title}
                  </h2>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-semibold text-gray-900">
                      ${items.price}
                    </p>
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <ShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
            
            
            )}
     </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
