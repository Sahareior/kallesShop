import React from 'react';
import './Card.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Card({ img, img2, id, info, addToCart }) {
  const notify = () => toast('🦄Item added succesfully!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <div>
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
      <div className="container">
        <section className="panel panel-default">
          <div className="row">
            <div className="col-xs-6 col-sm-4 col-lg-4">
              <figure className="prod-box">
                <div className="img-holder">
                 
                    <img src={img} className="item-img-1" alt="Something" />
                    <img src={img2} className="item-img-2" alt="Something2" />
                
                  <div className="blok-hover">
                  <div className='flex  justify-around -mt-4 items-center'>
       <button
className="btn btn-sm bg-slate-50  btn-link"
onClick={() => {
addToCart(info);
notify();
}}
>
<span className='-mt-2'><ShoppingCart /></span>
</button>

<Link to={`details/${id}`} state={{ data: info }} className="btn btn-sm zoomIn ">View Details</Link>
  </div>
                  </div>
      
                
                </div>
              
              </figure>
             
            </div>
         
          </div>
        </section>
        <div className='mt-4 '>
                <h4 className='z-10 font-[Poppins] text-[22px]'>{info.title}</h4>
                <h5 className='text-gray-800 font-bold'>{info.price} $ </h5>
               
                </div>
      </div>
    </div>
  );
}

export default Card;


