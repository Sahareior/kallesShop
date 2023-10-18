import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './Dropdown.css'

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import useCon from '../../Hooks/useCon';
import { addToDb } from '../../Hooks/useTools';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Dropdown({hotDeals}) {
  const { setCartPrice, cartPrice } = useCon();

  const notify = () =>
  toast("🦄 Item has added to cart!!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const addToCart = (data) => {
    const isDuplicate = cartPrice.find((item) => item.id === data.id);
    if (!isDuplicate) {
      setCartPrice([...cartPrice, data]);
      addToDb(data.id);
    } else {
      console.log('Item is already in the cart');
    }
  };
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper flex gap-96 mt-20"
       
      >
         <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  {
    hotDeals.map(items =>       <SwiperSlide className='flex gap-96' key={items._id}>
      <div className="card relative card-compact w-72  bg-base-100 ">
<figure><img className='h-72 w-full' src={items.img} alt="Shoes" /></figure>
<div className="card-body">
  <h2 className="card-title">{items.title}</h2>
  <div className="badge absolute top-2 badge-error badge-lg"> hot!!</div>
  <h4>price: <span  className='text-red-500'>{items.price}  $</span></h4>
  <div className="card-actions items-center bg-yellow-300 justify-between">
   <button onClick={() => {
                      addToCart(items);
                      notify();
                    }} className='btn btn-success'><ShoppingCartOutlined /></button>
   <Link to={`details/${items._id}`} state={{ data: items }}><button className="btn btn-primary">Buy Now</button></Link>
  </div>
</div>
</div>
      </SwiperSlide>)
  }


     
      </Swiper>
    </>
  );
}
