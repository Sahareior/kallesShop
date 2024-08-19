import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bestsellers = ({ data, addToCart }) => {
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

  const [prevPage, setPrevPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const bestsellersRef = useRef(null);
console.log(bestsellersRef)
  const handlePageChange = (pageNumber) => {
    if (prevPage > pageNumber) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const lastPage = totalPages === 0 ? 1 : totalPages;
      setCurrentPage(pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber);
    } else {
      setCurrentPage(pageNumber);
    }
    setPrevPage(pageNumber);

    // Scroll to top of the Bestsellers component
    if (bestsellersRef.current) {
      bestsellersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div ref={bestsellersRef} className='w-[1300px] p-5'>
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
          currentData.map(items => (
            <div key={items._id}>
              <a href="javascript:void(0)" className="group h-[450px] relative block bg-black">
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
                  <div className="mt-44 ">
                    <div
                      className="translate-y-16 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <p className="text-sm text-white bg-zinc-400 p-3 flex justify-evenly">
                        <Link to={`details/${items.id}`} state={{ data: items }} className="btn btn-sm hover:bg-red-500 zoomIn ">Details</Link>
                        <button onClick={() => {
                          addToCart(items);
                          notify();
                        }} className="btn btn-primary hover:bg-slate-900 btn-sm">
                          <span className='-mt-2'><ShoppingCart /></span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center gap-3 my-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-secondary"}`}
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
