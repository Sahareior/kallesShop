import { ShoppingCartSharp } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Newarrivals = ({ data,addToCart,isDarkMode }) => {
  const notify = () => toast('🦄 Item has added to cart!!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const [toTop, setToTop] = useState(0);
  let timer;

  useEffect(() => {
    const length = data.length;
    const limit = length * 400;
    const autoPlay = () => {
      setToTop((prevTop) => {
        const newTop = prevTop - 400; // Adjust this value based on your desired slide height
        if (newTop < -limit) {
          // If the slider reaches the end, reset to the beginning
          return 0;
        }
        return newTop;
      });
    };

    // Start autoplay when the component mounts
    timer = setInterval(autoPlay, 3500);

    return () => {
      // Clean up the timer when the component unmounts
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='w-[400px] mb-12'>
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
    
      <style>
        {`
          .wrap {
            position: relative;
          }
          .slider {
            width: 656px;
            height: 910px;
        
            overflow: hidden;
          }
          .slider__row {
            display: flex;
            flex-direction: column;
            gap: 30px;
            position: relative;
            top: ${toTop}px;
            left: 0;
            transition: top 0.5s ease;
          }
          .row__item {}
        `}
      </style>

      <div className="wrap">
        <div className="slider">
          <div className="slider__row" id="row">
            {data.map((items) => (
              <div
                key={items._id}
                className="card mt-8 h-[400px] card-compact w-96  border-b-2 "
              >
                <figure>
                  <img src={items.img} alt="Shoes" />
                </figure>
                <div className={`${isDarkMode? 'bg-black': 'bg-slate-100'} card-body`}>
                  <h2 className={`${isDarkMode? 'text-white': ''} card-title`}>{items.title}</h2>
                  <p className={`${isDarkMode? 'text-white':'text-red-500'} text-xl font-bold`}>Price: {items.price}$ <span className='text-black'>$</span></p>
                  <div className="card-actions mt-3 justify-around items-center">
                  <Link to={`details/${items._id}`} state={{ data: items }} className="btn btn-sm zoomIn btn-primary ">View Details</Link>
                  <button onClick={() => {
addToCart(items);
notify();
}} className='btn btn-accent btn-sm'><span className='-mt-2'><ShoppingCartSharp /></span></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newarrivals;
