import React, { useRef, useState } from "react";
import Headings from "../Shared/Headings";
import { Link } from "react-router-dom";
import { ShoppingCartSharp } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCon from "../Hooks/useCon";

const MobileView = ({ data, text, addToCart }) => {
  const {user,logout,isDarkMode} = useCon()
  const cardContainerRef = useRef(null)

  const notify = () =>
    toast(" Item has added to cart!!", {
      position: "bottom-right",
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
  const itemsPerPage = 4;

  const handlePageChange = (pageNumber) => {
    if (prevpage > pageNumber) {
      // Navigated back, so we should reset the current page if necessary
      const totalPages = Math.ceil(data?.length / itemsPerPage);
      const lastPage = totalPages === 0 ? 1 : totalPages;
      setCurrentPage(
        pageNumber < 1 ? 1 : pageNumber > lastPage ? lastPage : pageNumber
      );
    } else {
      setCurrentPage(pageNumber);
    }
    setPrevpage(pageNumber);

    if (cardContainerRef.current) {
      cardContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);

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
      {/* <Headings text={text}></Headings> */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-3 p-2 justify-items-center" ref={cardContainerRef}>
        {currentData.map((item) => (
          <div key={item._id} className=" h-[350px] relative w-full">
            <div className="">
              <div className="h-52 w-full">
                <img
                  src={item.img}
                  alt="Product"
                  className="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover h-full w-full md:h-auto"
                />
              </div>
              <div className="p-1 flex  flex-col justify-between">
             <div>
             <p className={`${isDarkMode ? 'text-stone-100' : 'text-black'}`}>{item.title}</p>

<p className={`${isDarkMode? 'text-slate-200': 'text-black'} -mt-0`}>${item.price}</p>
             </div>
                <div className="flex w-full gap-4 mt-3 absolute bottom-3 justify-around">
                  <Link
                    to={`/mobile/details/${item._id}`}
                    state={{ data: item }}
                  >
                    <button className="btn btn-error text-center btn-sm">
                      Buy Now
                    </button>
                  </Link>
                  {/* details/ */}
                  <button
                    onClick={() => {
                      addToCart(item);
                      notify();
                    }}
                    className="btn btn-group hover:bg-purple-300 flex items-center justify-center btn-sm"
                  >
                    <span className="-mt-2">
                      <ShoppingCartSharp></ShoppingCartSharp>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 my-5 ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-warning" : "btn-neutral"
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

export default MobileView;
