import React, { useState } from 'react';
import MobileView from './MobileView';
import Headings from '../Shared/Headings';
import { Link } from 'react-router-dom';
import { ShoppingBasket, ShoppingCart } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Bestsellers = ({data,addToCart}) => {

  const notify = () =>
  toast("🦄 Item has added to cart!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const [prevpage, setPrevpage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (pageNumber) => {
    if (prevpage > pageNumber) {
        // Navigated back, so we should reset the current page if necessary
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const lastPage = totalPages === 0 ? 1 : totalPages;
        setCurrentPage(pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber);
    } else {
        setCurrentPage(pageNumber);
    }
    setPrevpage(pageNumber);
};

// Calculate the index range for the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const totalPages = Math.ceil(data.length / itemsPerPage);
const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className='w-[1300px] p-5'>
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
    
     <div className='grid grid-cols-3 gap-3'>
      {
        currentData.map(items => <div key={items._id}><a href="javascript:void(0)" className="group relative block bg-black">
        <img
          alt="Developer"
          src={items.img}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />
      
        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-extrabold uppercase tracking-widest text-white">
         <div className="badge badge-warning text-[17px]">{items.price} $</div>
          </p>
      
          <p className="text-xl font-bold text-white sm:text-2xl">{items.title}</p>
      
          <div className="mt-7 sm:mt-48 lg:mt-64">
            <div
              className="translate-y-16 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
            >
              <p className="text-sm text-white bg-zinc-400 p-3 flex justify-evenly">
              <Link to={`details/${items.id}`} state={{ data: items }} className="btn btn-sm hover:bg-red-500 zoomIn ">Details</Link>
              <button onClick={() => {
                      addToCart(items);
                      notify();
                    }} className="btn btn-primary  hover:bg-slate-900 btn-sm"> <span className='-mt-2'><ShoppingCart /></span> </button>
              </p>
            </div>
          </div>
        </div>
      </a>
      </div>)
      }
     </div>
     <div className="flex justify-center gap-3 my-5 ">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn ${
                            currentPage === index + 1 ? "btn-primary" : "btn-secondary"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
    </div>
  );
};

export default Bestsellers;