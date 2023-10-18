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
            slidesPerView: 5, // Show five slides on screens wider than 1024px
          },
        }}
      >
        {similerProducts.map((items) => (
          <SwiperSlide key={items.id}>
     <div className="flex justify-center">
     {mobile ? (
             <Link to={`products/details/${items._id}`} state={{ data: items }}>
              <div
                className="
    group
    inline-block pb-4 w-[200px] bg-gradient-to-tr from-blue-400 to-orange-400 text-white overflow-hidden rounded-2xl shadow
    hover:shadow-md
    transition
  "
              >
                <figure className="max-h-64 aspect-square overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition group-hover:scale-125"
                    src={items.img}
                  />
                </figure>
                <div className="p-1 mt-6 ">
                 <div className="-mt-5">
                 <span className="text-xl text-white font-bold">{items.title}</span>
                  <h5 className="text-yellow-400 mt-2">{items.price} $</h5>
                 </div>
                 <button className="btn btn-sm mt-2 btn-secondary"> <span className="-mt-2"><ShoppingCart /></span> </button>
                </div>
              </div>
             </Link>
            ) : (
              <Link to={`products/details/${items._id}`} state={{ data: items }}>
              <div className="bg-black ml-14 w-72 shadow-md hover:shadow-xl  rounded-xl">
                <a href="#">
                  <img
                    src={items.img}
                    alt="Product image"
                    className="h-80 w-72 object-cover hover:scale-105 duration-500 rounded-t-xl"
                  />
                </a>
                <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xl">
                    {items.title}
                  </span>
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    Product Name
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-white cursor-auto my-1">
                      {" "}
                      $ {items.price}
                    </p>
                    {/* <del>
        </del> */}
                    <div className="ml-auto">
                      
                        <ShoppingCart />
                  
                    </div>
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
